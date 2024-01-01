import "./[id].css";
import { Component, createMemo } from "solid-js";
import { useParams } from "@solidjs/router";

import { mods } from "../data";
import { ModInfo } from "../../components/ModInfo";
import { ModMeta } from "../../components/ModMeta";
import { AuthorInfo } from "../../components/AuthorInfo";

function getModInfo(namespace: string) {
  return mods.find((mod) => encodeURIComponent(mod.namespace) === namespace);
}

export const Mod: Component = () => {
  const params = useParams();
  const modInfo = createMemo(() => getModInfo(params.namespace)!);
  return (
    <div class="Mod">
      <ModInfo {...modInfo()} />
      <AuthorInfo authors={modInfo().authors} />
      <ModMeta {...modInfo()} />
    </div>
  );
};
