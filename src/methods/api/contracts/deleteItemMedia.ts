import axios from "axios";
import { Api } from "../../../constants";

const deleteMedia = async (contractItemId: number, mediaId: number) => {
  return await axios.delete(
    Api(`employee/contract/items/delete-media/${contractItemId}/${mediaId}`)
  );
};

export const deleteContractItemMedia = deleteMedia;
