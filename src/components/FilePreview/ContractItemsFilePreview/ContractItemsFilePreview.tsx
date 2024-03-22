import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";

// Icon
import PrintIcon from "@mui/icons-material/Print";
import { CloudUpload } from "@mui/icons-material";

function FilePreview(props: PropsType) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        width: 1,
        height: props.height || 60,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "primary.main",
        borderRadius: 1,
        direction: "rtl",
      }}
    >
      <IconButton
        disabled={!props.fileLink}
        color="primary"
        component="a"
        href={props.fileLink}
        target="_blank"
      >
        <PrintIcon />
      </IconButton>

      <Stack alignItems="center">
        <Typography
          variant="body1"
          sx={{
            maxWidth: 190,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {props.fileName}
        </Typography>

        {!props.hideFileSize && (
          <Typography
            variant="body2"
            sx={{
              maxWidth: 190,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
            color="GrayText"
          >
            {props.fileSize}
          </Typography>
        )}
      </Stack>
      <Avatar
        sx={{
          bgcolor: "primary.light",
          maxHeight: props.height && props.height * (4 / 5),
          maxWidth: props.height && props.height * (4 / 5),
        }}
      >
        <Typography variant="body2" fontWeight={700}>
          {props.fileExtension?.toUpperCase()}
        </Typography>
      </Avatar>

      
      <Box display="flex" alignItems="center" flex={1} style={{ cursor: 'pointer' }}>

                        <Box
                          border="1px dashed #ccc"
                          display="flex"
                          alignItems="center"
                          marginRight="10px"
                          
                        >
                          <Box padding="5px" marginRight="10px">
                            <CloudUpload />
                          </Box>
                          
      <Typography variant="body2">
        {/* اضافة المرفقات */}
        {props.fileName}
      </Typography>
      <Typography variant="caption">
        الصيغ المناسبة PNG - PDF - JPG
      </Typography>
      <input
        id="fileInput"
        type="file"
        accept=".pdf,.png,.jpg"
        style={{ display: 'none' }}
       
        multiple
      />
    
                        </Box>
                      </Box>
    </Box>
  );
}

type PropsType = {
  fileName: string;
  fileSize?: string;
  fileExtension?: string;
  fileLink?: string;
  height?: number;
  hideFileSize?: boolean;
};

export default FilePreview;
