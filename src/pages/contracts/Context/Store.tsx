import { createContext, useState } from "react";

export const ContractCreationOptionContext = createContext<
  [
    ContractCreationOptionType | null,
    React.Dispatch<
      React.SetStateAction<ContractCreationOptionType | null>
    > | null
  ]
>([null, null]);

export function ContextProvider(props: PropsType) {
  const [option, setOption] = useState<ContractCreationOptionType | null>(null);

  return (
    <ContractCreationOptionContext.Provider value={[option, setOption]}>
      {props.children}
    </ContractCreationOptionContext.Provider>
  );
}

type PropsType = {
  children: React.ReactElement;
};

// export interface ContractCreationOptionType {
//   id: number;
//   name: string;
// }

type ContractCreationOptionType = number;
