import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: () =>
      //   props: { colorMode: string }
      ({
        body: {
          // bg: props.colorMode === "light" ? "gray" : "black",
          bg: "white",
        },
      }),
  },
});

export default theme;
