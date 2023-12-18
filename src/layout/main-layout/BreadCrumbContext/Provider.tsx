import { useEffect, useState } from "react";
import { BreadCrumbContext, BreadCrumbLinkType } from ".";
import { useLocation } from "react-router";
import {
  generatePathObjects,
  translatePathObjects,
} from "../../../methods/generatePathObjects";
import { pathTranslationArray } from "../../../constants/RoutePathTranslation";

function BreadCrumbContextProvider(props: { children: React.ReactNode }) {
  const [customLinks, setCustomLinks] = useState<BreadCrumbLinkType[]>([]);
  function updateAll(links: BreadCrumbLinkType[]) {
    setTimeout(() => {
      setCustomLinks(links);
    }, 200);
  }
  function updateLast(link: BreadCrumbLinkType) {
    let instance: BreadCrumbLinkType[] = linksArrayGenerator().slice(
      0,
      customLinks.length - 1
    );
    instance.push(link);
    setTimeout(() => {
      setCustomLinks(instance);
    }, 200);
  }
  const location = useLocation();

  function addLast(...link: BreadCrumbLinkType[]) {
    setTimeout(() => {
      setCustomLinks([...linksArrayGenerator(), ...link]);
    }, 200);
  }
  function linksArrayGenerator(): BreadCrumbLinkType[] {
    return translatePathObjects(
      pathTranslationArray,
      generatePathObjects(location.pathname)
    ).map((path) => ({
      title: path.name,
      path: path.path,
    }));
  }

  useEffect(() => {
    setCustomLinks([]);
  }, [location.pathname]);

  return (
    <BreadCrumbContext.Provider
      value={{
        links: customLinks.length ? customLinks : linksArrayGenerator(),
        updateAll,
        updateLast,
        addLast,
      }}
    >
      {props.children}
    </BreadCrumbContext.Provider>
  );
}

export default BreadCrumbContextProvider;
