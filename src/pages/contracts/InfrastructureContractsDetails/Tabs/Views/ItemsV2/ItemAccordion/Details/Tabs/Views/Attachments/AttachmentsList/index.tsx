import { ContractSubItemAttachment } from "../../../../../../../../../../../../types/Contracts/ContractItems";
import SingleAttachment from "./SingleAttachment";

export default function AttachementsList(props: PropsType) {
  // TODO::declare and define component variables and state

  // TODO::declare and define methods

  // TODO::return out component view
  return (
    <>
      {props.attachments.map((_file) => (
        <SingleAttachment key={_file.id} attachmentFile={_file} />
      ))}
    </>
  );
}

type PropsType = {
  attachments: ContractSubItemAttachment[];
};
