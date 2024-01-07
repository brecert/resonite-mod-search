import { Component, createMemo } from "solid-js";
import { useParams } from "@solidjs/router";

import { mods } from "../data";
import { ModInfo } from "../../components/ModInfo";
import { VersionsInfo } from "../../components/VersionsInfo";
import { AuthorsInfo } from "../../components/AuthorsInfo";

function getModInfo(namespace: string) {
  return mods.find((mod) => encodeURIComponent(mod.namespace) === namespace);
}

export const Mod: Component = () => {
  const params = useParams();
  const modInfo = createMemo(() => getModInfo(params.namespace)!);
  return (
    <div class="Mod panel vertical-layout">
      <ModInfo {...modInfo()} />
      <AuthorsInfo authors={modInfo().authors} />
      <VersionsInfo {...modInfo()} />
    </div>
  );
};
