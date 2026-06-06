import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/** Neon-space post-processing. Bloom is kept restrained so small stars and the
 *  DOM overlay text stay readable; a soft vignette focuses the center. */
export default function Effects() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.85}
        luminanceThreshold={0.13}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.72}
      />
      <Vignette offset={0.26} darkness={0.62} />
    </EffectComposer>
  );
}
