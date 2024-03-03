import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import UploadFileInput from "../../../../../components/UploadFileInput";
import UploadFilesInput from "../../../../../components/UploadFileInput/UploadFiles";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ShowMap } from "./ShowMap";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { Api } from "../../../../../constants";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import { ImageListType, ImageType } from "react-images-uploading";
import UploadImage from "../../../../../components/UploadImage";
import {
  CustomMenuList,
  ImageMenuItem,
} from "../../../../designs/CreateOrUpdate/FormSections/images";
import UploadImageFile from "./UploadImg";
import Loader from "../../../../../components/Loading/Loader";
import { objectToFormData } from "../../../../../methods";
import { serialize } from "object-to-formdata";

type HeaderFieldName =
  | "numberOfPieces"
  | "area"
  | "location"
  | "bannerImg"
  | "masterPlanImg"
  | "projectIcon"
  | "imagesAlpom";

type FormHeaders = {
  numberOfPieces: number;
  area: number;
  location: string;
  bannerImg: string;
  masterPlanImg: string;
  projectIcon: string;
  imagesAlpom: string[];
};
type mideaFile = {
  collection_name: string;
  conversions_disk: string;
  created_at: string;
  custom_properties: [];
  disk: string;
  file_name: string;
  generated_conversions: string;
  id: number;
  manipulations: [];
  mime_type: string;
  model_id: number;
  model_type: string;
  name: string;
  order_column: number;
  original_url: string;
  preview_url: string;
  responsive_images: [];
  size: number;
  updated_at: string;
  uuid: string;
};
type contractDetails = {
  application: number;
  area: number;
  contract_id: number;
  created_at: string;
  id: number;
  location: string;
  map: string;
  number_parts: number;
  online_service: number;
  updated_at: string;
  website: number;
  media: mideaFile[];
};
type HeaderType = {
  id: string;
  name: HeaderFieldName;
  text: string;
};
const FormHeaders: HeaderType[] = [
  { id: "FH-0", name: "numberOfPieces", text: "عدد القطع" },
  { id: "FH-1", name: "area", text: "المساحة" },
  { id: "FH-2", name: "location", text: "الموقع" },
];

const ProjectWorkDetails = (props: PropsType) => {
  const [showOptions, setShowOptions] = useState({
    website: false,
    application: false,
    electronicSerive: false,
  });
  const { register, reset, handleSubmit } = useForm<FormHeaders>({
    defaultValues: {},
  });
  const [loading, setLoading] = useState(false);
  const [bannerImg, setBannerImg] = useState<ImageType[]>([]);
  const [masterPlanImg, setMasterPlanImg] = useState<ImageType[]>([]);
  const [iconImg, setIconImg] = useState<ImageType[]>([]);
  const [imagesAlpom, setImagesAlpom] = useState<ImageListType>([]);
  const [locationsPositions, setLocationsPositions] = useState<
    [number, number][]
  >([]);
  const [editedData, setEditedData] = useState<contractDetails>();
  const { enqueueSnackbar } = useSnackbar();

  // TODO::define global
  const FieldGrid = ({
    text,
    name,
  }: {
    text: string;
    name: HeaderFieldName;
  }) => {
    return (
      <Grid item xs={6} paddingX={1}>
        <AddLabelToEl label={text} required>
          <TextField
            sx={{ background: "#fff" }}
            required
            {...register(name)}
            placeholder={text}
          />
        </AddLabelToEl>
      </Grid>
    );
  };

  const handleDeleteFile = (idx: number) => {
    let arr = imagesAlpom;
    console.log("Breakpoint 101:", arr, idx);
    arr.splice(idx, 1);
    console.log("Breakpoint 102:", arr);
    setImagesAlpom([...arr]);
  };

  const handleFormSubmit = handleSubmit((formData) => {
    let data = {
      contract_id: props.contractId,
      number_parts: formData.numberOfPieces,
      area: formData.area,
      location: formData.location,
      website: showOptions.website ? 1 : 0,
      application: showOptions.application ? 1 : 0,
      online_service: showOptions.electronicSerive ? 1 : 0,
      banner: bannerImg[0]?.file,
      master_plan: masterPlanImg[0]?.file,
      main_image: iconImg[0]?.file,
      sub_images: imagesAlpom
        .map((f) => f.file)
        .filter((f) => f instanceof File),
      map: JSON.stringify(
        locationsPositions.map((ele) => ({
          lat: ele[0],
          long: ele[1],
        }))
      ),
    };
    setLoading(true);
    console.log("Data :-", data);
    (!editedData?.id
      ? axios.post(Api(`employee/contract/details/store`), serialize(data))
      : axios.post(
          Api(`employee/contract/details/${editedData?.id}`),
          serialize(data)
        )
    )
      .then((res) => {
        console.log("response101", res);
        if (editedData?.id) enqueueSnackbar("تم تعديل تفاصيل المشروع بنجاح");
        else enqueueSnackbar("تم حفظ تفاصيل المشروع بنجاح");
      })
      .catch((err) => {
        console.log("Error101 :-", err);
        enqueueSnackbar("تعذر الحفظ", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  // TODO::fetch of contract
  useEffect(() => {
    if (props.edit) {
      axios
        .get(Api(`employee/contract/${props.contractId}`))
        .then((res) => {
          console.log("Breakpoint101 in details page:", res.data.data);
          setEditedData(res.data.data.contract_details);
        })
        .catch((err) => {
          console.log("Error101 :-", err);
          enqueueSnackbar("تعذر تحميل الداتا", { variant: "error" });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.edit]);

  // TODO::set data if edit approach
  useEffect(() => {
    if (props.edit && editedData?.id) {
      reset({
        area: editedData?.area,
        location: editedData?.location,
        numberOfPieces: editedData?.number_parts,
      });
      let banner = editedData?.media.filter(
        (ele) => ele.collection_name == "banner"
      )[0] as ImageType;
      console.log("Target Banner Image : ", banner);
      if (banner != undefined) setBannerImg([banner]);

      let master = editedData?.media.filter(
        (ele) => ele.collection_name == "master_plan"
      )[0] as ImageType;
      if (master != undefined) setMasterPlanImg([master]);

      let icon = editedData?.media.filter(
        (ele) => ele.collection_name == "main_image"
      )[0] as ImageType;
      if (icon != undefined) setIconImg([icon]);

      let subImgs = editedData?.media.filter(
        (ele) => ele.collection_name == "sub_images"
      ) as ImageListType;
      console.log("subImgs", subImgs);
      if (subImgs != undefined && subImgs.length > 0) setImagesAlpom(subImgs);

      setShowOptions({
        website: editedData?.website == 1 ? true : false,
        application: editedData?.application == 1 ? true : false,
        electronicSerive: editedData?.online_service == 1 ? true : false,
      });
      let str = editedData?.map.slice(2, -3);
      let arr = str?.toString().split("},{");
      let positions: [number, number][] = [];
      for (let i = 0; i < arr?.length; i++) {
        let cordin = arr[i].split(",");
        let temp: [number, number] = [
          +cordin[0].split(":")[1],
          +cordin[1].split(":")[1],
        ];
        positions.push(temp);
      }
      setLocationsPositions(positions);
    }
  }, [props.edit, editedData]);

  return (
    <Box sx={{ position: "relative" }}>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "#80808091",
            zIndex: 1500,
            borderRadius: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Box>
      )}
      {/* show way options */}
      <Box sx={{ display: "flex" }}>
        <Typography variant="h6" fontWeight={700} sx={{ paddingRight: "4rem" }}>
          طريقة العرض
        </Typography>
        <RadioGroup name="use-radio-group">
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showOptions.website}
                  onChange={(e) => {
                    setShowOptions((prev) => {
                      let data = {
                        ...prev,
                        website: !prev.website,
                      };
                      return data;
                    });
                  }}
                />
              }
              label="الموقع"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showOptions.application}
                  onChange={(e) => {
                    setShowOptions((prev) => {
                      let data = {
                        ...prev,
                        application: !prev.application,
                      };
                      return data;
                    });
                  }}
                />
              }
              label="التطبيق"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showOptions.electronicSerive}
                  onChange={(e) => {
                    setShowOptions((prev) => {
                      let data = {
                        ...prev,
                        electronicSerive: !prev.electronicSerive,
                      };
                      return data;
                    });
                  }}
                />
              }
              label="خدمة الالكترونية"
            />
          </Box>
        </RadioGroup>
      </Box>
      {/* Form Fields */}
      <Box
        className="AddDesignFormContainer"
        sx={{ width: "100%", padding: "2rem" }}
        component="form"
        onSubmit={handleFormSubmit}
        noValidate
        autoComplete="on"
      >
        <Grid container sx={{ width: "100%" }}>
          {FormHeaders.map((header) => {
            return (
              <FieldGrid
                key={header.id}
                text={header.text}
                name={header.name}
              />
            );
          })}
          <Grid p={1} item xs={12} md={6}>
            <Typography>ارفاق صورة البنر</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UploadImageFile
                images={bannerImg}
                width={bannerImg.length > 0 ? `90%` : "100%"}
                setImages={(ar) => {
                  console.log("Image:", ar);
                  setBannerImg(ar);
                }}
              />
              {bannerImg.length > 0 && (
                <DeleteIcon
                  onClick={() => {
                    console.log(bannerImg[0]);
                    if (bannerImg.length) {
                      if (bannerImg[0]?.id) {
                        setLoading(true);
                        axios
                          .delete(
                            Api(
                              `employee/contract/details/delete-media/${editedData?.id}/${bannerImg[0]?.id}`
                            )
                          )
                          .then((res) => {
                            console.log("response101", res);
                            setBannerImg([]);
                            enqueueSnackbar("تم حذف الملف بنجاح");
                          })
                          .catch((err) => {
                            console.log("Error101 :-", err);
                            enqueueSnackbar("تعذر الحذف", { variant: "error" });
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                      } else {
                        setBannerImg([]);
                      }
                    }
                  }}
                  sx={{
                    fontSize: "2.3rem",
                    margin: "0.2rem",
                    borderRadius: "50%",
                    transition: "all 0.5s ease",
                    cursor: "pointer",
                    ":hover": {
                      transform: "scale(1.15)",
                      boxShadow: "1px 1px 2px 3px tomato",
                      color: "red",
                    },
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid p={1} item xs={12} md={6}>
            <Typography>اضافة صورة الماستر بلان</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UploadImageFile
                images={masterPlanImg}
                width={masterPlanImg.length > 0 ? `90%` : "100%"}
                setImages={(ar) => {
                  console.log("Image:", ar);
                  setMasterPlanImg(ar);
                }}
              />
              {masterPlanImg.length > 0 && (
                <DeleteIcon
                  onClick={() => {
                    if (masterPlanImg.length) {
                      if (masterPlanImg[0]?.id) {
                        setLoading(true);
                        axios
                          .delete(
                            Api(
                              `employee/contract/details/delete-media/${editedData?.id}/${masterPlanImg[0]?.id}`
                            )
                          )
                          .then((res) => {
                            console.log("response101", res);
                            setMasterPlanImg([]);
                            enqueueSnackbar("تم حذف الملف بنجاح");
                          })
                          .catch((err) => {
                            console.log("Error101 :-", err);
                            enqueueSnackbar("تعذر الحذف", { variant: "error" });
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                      } else {
                        setMasterPlanImg([]);
                      }
                    }
                  }}
                  sx={{
                    fontSize: "2.3rem",
                    margin: "0.2rem",
                    borderRadius: "50%",
                    transition: "all 0.5s ease",
                    cursor: "pointer",
                    ":hover": {
                      transform: "scale(1.15)",
                      boxShadow: "1px 1px 2px 3px tomato",
                      color: "red",
                    },
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid p={1} item xs={12} md={6}>
            <Typography>ارفاق ايكون المشروع</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UploadImageFile
                images={iconImg}
                width={iconImg.length > 0 ? `90%` : "100%"}
                setImages={(ar) => {
                  console.log("Image:", ar);
                  setIconImg(ar);
                }}
              />
              {iconImg.length > 0 && (
                <DeleteIcon
                  onClick={() => {
                    if (iconImg.length) {
                      if (iconImg[0]?.id) {
                        setLoading(true);
                        axios
                          .delete(
                            Api(
                              `employee/contract/details/delete-media/${editedData?.id}/${iconImg[0]?.id}`
                            )
                          )
                          .then((res) => {
                            console.log("response101", res);
                            setIconImg([]);
                            enqueueSnackbar("تم حذف الملف بنجاح");
                          })
                          .catch((err) => {
                            console.log("Error101 :-", err);
                            enqueueSnackbar("تعذر الحذف", { variant: "error" });
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                      } else {
                        setIconImg([]);
                      }
                    }
                  }}
                  sx={{
                    fontSize: "2.3rem",
                    margin: "0.2rem",
                    borderRadius: "50%",
                    transition: "all 0.5s ease",
                    cursor: "pointer",
                    ":hover": {
                      transform: "scale(1.15)",
                      boxShadow: "1px 1px 2px 3px tomato",
                      color: "red",
                    },
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid p={1} item xs={12} md={6}>
            <Typography>اضافة البوم الصور (بحد اقصى 4 صور)</Typography>
            <UploadImageFile
              multible={true}
              images={imagesAlpom}
              width={"100%"}
              setImages={(ar) => {
                setImagesAlpom(ar);
              }}
            />
          </Grid>
          <Grid p={1} item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {imagesAlpom?.length > 0 &&
                imagesAlpom.map((item, idx) => {
                  let file = item.file;
                  let fileName = file?.name || item?.file_name;
                  return (
                    <Box
                      key={`${idx}_${file?.name}_${file?.size}`}
                      sx={{
                        width: "47%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#fff",
                        padding: "0.2rem",
                        borderRadius: "8px",
                        marginY: "0.2rem",
                      }}
                    >
                      <DescriptionIcon />
                      <Box>
                        <Typography variant="body1" fontSize={13}>
                          {fileName.slice(0, Math.min(18, fileName.length))}
                          {(fileName?.length || 0) > 18 ? ".." : ""}
                        </Typography>
                        <Typography variant="body1" fontSize={10}>
                          {new Date().toLocaleDateString()} ,{" "}
                          {Math.round((file?.size || 0) / 1024)} MB
                        </Typography>
                      </Box>
                      <DeleteOutlineOutlinedIcon
                        onClick={() => {
                          if (item?.id) {
                            setLoading(true);
                            axios
                              .delete(
                                Api(
                                  `employee/contract/details/delete-media/${editedData?.id}/${item?.id}`
                                )
                              )
                              .then((res) => {
                                console.log("response101", res);
                                handleDeleteFile(idx);
                                enqueueSnackbar("تم حذف الملف بنجاح");
                              })
                              .catch((err) => {
                                console.log("Error101 :-", err);
                                enqueueSnackbar("تعذر الحذف", {
                                  variant: "error",
                                });
                              })
                              .finally(() => {
                                setLoading(false);
                              });
                          } else {
                            handleDeleteFile(idx);
                          }
                        }}
                        sx={{
                          transition: "all 0.5 ease",
                          cursor: "pointer",
                          ":hover": {
                            color: "red",
                          },
                        }}
                      />
                    </Box>
                  );
                })}
            </Box>
          </Grid>
        </Grid>
        {/* Map */}
        <Box sx={{ marginTop: "3rem" }}>
          <Typography variant="h5">تحديد الموقع على الخريطة</Typography>
          <ShowMap
            positionClick={locationsPositions}
            setPositionClick={setLocationsPositions}
            lat={21.036}
            long={34.2048}
          />
        </Box>
        {/* Save */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Button type="submit" variant="contained" size="large">
            {props.saveStatment ?? "حفظ"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectWorkDetails;
type PropsType = {
  edit: boolean;
  contractId?: number;
  saveStatment?: string;
};
