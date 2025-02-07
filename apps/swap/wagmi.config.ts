import { defineConfig } from "@wagmi/cli";
import { react, hardhat } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "./utils/contracts.ts",
  plugins: [
    hardhat({
      project: "../demo-contract",
    }),
    react(),
  ],
});
