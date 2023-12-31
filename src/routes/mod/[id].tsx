import "./[id].css";
import { Component } from "solid-js";
import { useParams } from "@solidjs/router";

import { mods } from "../data";
import { ModInfo } from "../../components/ModInfo";
import { ModMeta } from "../../components/ModMeta";

function getModInfo(namespace: string) {
  return mods.find((mod) => mod.namespace === namespace);
}

export const Mod: Component = () => {
  const { namespace } = useParams();
  const modInfo = getModInfo(namespace)!;
  return (
    <div class="Mod">
      <ModInfo {...modInfo} />
      <ModMeta {...modInfo} />
    </div>
  );
};
