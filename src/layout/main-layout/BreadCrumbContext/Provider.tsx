import { useEffect, useState } from "react";
import { BreadCrumbContext, BreadCrumbLinkType } from ".";
import { useLocation } from "react-router";
import {
  generatePathObjects,
  translatePathObjects,
} from "../../../methods/generatePathObjects";
import { pathTranslationArray } from "../../../constants/RoutePathTranslation";

function BreadCrumbContextProvider(props: { children: React.ReactNode }) {
  const [links, setLinks] = useState<BreadCrumbLinkType[]>([]);
  function updateAll(links: BreadCrumbLinkType[]) {
    setLinks(links);
  }
  function updateLast(link: BreadCrumbLinkType) {
    let instance: BreadCrumbLinkType[] = [...links].slice(0, links.length - 1);
    instance.push(link);
    setLinks(instance);
  }
  const location = useLocation();
  useEffect(() => {
    setLinks(
      translatePathObjects(
        pathTranslationArray,
        generatePathObjects(location.pathname)
      ).map((path) => ({
        title: path.name,
        path: path.path,
      }))
    );
  }, [location.pathname]);
  console.log(links);

  return (
    <BreadCrumbContext.Provider value={{ links, updateAll, updateLast }}>
      {props.children}
    </BreadCrumbContext.Provider>
  );
}

export default BreadCrumbContextProvider;
