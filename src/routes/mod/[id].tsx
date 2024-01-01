import "./[id].css";
import { Component } from "solid-js";
import { useParams } from "@solidjs/router";

import { mods } from "../data";
import { ModInfo } from "../../components/ModInfo";
import { ModMeta } from "../../components/ModMeta";
import { AuthorInfo } from "../../components/AuthorInfo";

function getModInfo(namespace: string) {
  return mods.find((mod) => encodeURIComponent(mod.namespace) === namespace);
}

export const Mod: Component = () => {
  const { namespace } = useParams();
  const modInfo = getModInfo(namespace)!;
  return (
    <div class="Mod">
      <ModInfo {...modInfo} />
      <AuthorInfo authors={modInfo.authors} />
      <ModMeta {...modInfo} />
    </div>
  );
};
