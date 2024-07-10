import { Box, Stack } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRef } from "react";

export default function DaysRow() {
  // TODO::declare and define component state and variables
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // TODO::declare and define component helper methods
  const MoveScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };
  
  // * return component UI.
  return (
    <Stack direction="row" justifyContent={"center"} alignItems={"center"}>
      {/* prev */}
      <Box
        onClick={() => MoveScroll("left")}
        bgcolor={"#fff"}
        color={"#004693"}
        sx={{
          height: "55px",
          width: "55px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: " #ffffffad",
          boxShadow: " 6px 5px 8px 15px #ffffffc9",
          cursor: "pointer",
        }}
      >
        <ArrowForwardIosIcon />
      </Box>
      <Stack
        ref={scrollContainerRef}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        sx={{
          overflow: "auto",
          scrollbarWidth: "none",
          overflowStyle: "none",
          scrollBehavior: "smooth",
          position: "relative",
        }}
      >
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#004693"}
          borderRadius={"12px"}
          color={"#fff"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
        <Box
          bgcolor={"#D0DCE9"}
          borderRadius={"12px"}
          color={"#004693"}
          p={1}
          mx={1}
        >
          23/3/2024
        </Box>
      </Stack>
      {/* next */}
      <Box
        bgcolor={"#fff"}
        color={"#004693"}
        onClick={() => MoveScroll("right")}
        sx={{
          height: "55px",
          width: "55px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: " #ffffffad",
          boxShadow: " 6px 5px 8px 15px #ffffffc9",
          cursor: "pointer",
        }}
      >
        <ArrowBackIosNewIcon />
      </Box>
    </Stack>
  );
}
