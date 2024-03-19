import { Avatar, Box, Divider, TextField, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AttachFileSharpIcon from "@mui/icons-material/AttachFileSharp";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";

const ChatBox = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "365px",
        height: "400px",
        bottom: "140%",
        right: "1%",
        borderRadius: "12px",
        zIndex: 100,
        boxShadow: "2px 2px 3px gray",
        border: "1px solid gray",
        backgroundColor: "#fff",
        color: "#000",
      }}
    >
      {/* Top part */}
      <Box
        sx={{
          width: "100%",
          height: "60px",
          backgroundColor: "#004693",
          color: "#fff",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <ChevronRightIcon sx={{ marginX: "0.2rem" }} />
        <Avatar alt="User Name" sx={{ marginX: "0.2rem" }}>
          H
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography fontSize={"1rem"} fontWeight={600}>
            أسم المستخدم
          </Typography>
          <Typography textAlign={'left'} fontSize={"0.8rem"} fontWeight={400}>
            متصل
          </Typography>
        </Box>
      </Box>
      {/* Medium */}
      <Box
        sx={{
          height: "280px",
          width: "100%",
          overflowY: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {/* Message 1 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "start",
          }}
        >
          <Typography
            sx={{
              bgcolor: "#004693",
              color: "#fff",
              fontSize: "1rem",
              margin: "0.4rem",
              padding: "0.3rem",
              maxWidth: "70%",
              borderRadius: "6px",
            }}
          >
            Message 1
          </Typography>
        </Box>
        {/* Message 2 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
          }}
        >
          <Typography
            sx={{
              bgcolor: "#f2f2f2",
              color: "#000",
              fontSize: "1rem",
              margin: "0.4rem",
              padding: "0.3rem",
              maxWidth: "70%",
              borderRadius: "6px",
            }}
          >
            Message 2
          </Typography>
        </Box>
        {/* Copies */}
        {/* Message 1 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "start",
          }}
        >
          <Typography
            sx={{
              bgcolor: "#004693",
              color: "#fff",
              fontSize: "1rem",
              margin: "0.4rem",
              padding: "0.3rem",
              maxWidth: "70%",
              borderRadius: "6px",
            }}
          >
            Message 1
          </Typography>
        </Box>
        {/* Message 2 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
          }}
        >
          <Typography
            sx={{
              bgcolor: "#f2f2f2",
              color: "#000",
              fontSize: "1rem",
              margin: "0.4rem",
              padding: "0.3rem",
              maxWidth: "70%",
              borderRadius: "6px",
            }}
          >
            Message 2
          </Typography>
        </Box>
        {/* Message 1 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "start",
          }}
        >
          <Typography
            sx={{
              bgcolor: "#004693",
              color: "#fff",
              fontSize: "1rem",
              margin: "0.4rem",
              padding: "0.3rem",
              maxWidth: "70%",
              borderRadius: "6px",
            }}
          >
            Message 1
          </Typography>
        </Box>
        {/* Message 2 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
          }}
        >
          <Typography
            sx={{
              bgcolor: "#f2f2f2",
              color: "#000",
              fontSize: "1rem",
              margin: "0.4rem",
              padding: "0.3rem",
              maxWidth: "70%",
              borderRadius: "6px",
            }}
          >
            Message 2
          </Typography>
        </Box>
        {/* Message 1 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "start",
          }}
        >
          <Typography
            sx={{
              bgcolor: "#004693",
              color: "#fff",
              fontSize: "1rem",
              margin: "0.4rem",
              padding: "0.3rem",
              maxWidth: "70%",
              borderRadius: "6px",
            }}
          >
            Message 1
          </Typography>
        </Box>
        {/* Message 2 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
          }}
        >
          <Typography
            sx={{
              bgcolor: "#f2f2f2",
              color: "#000",
              fontSize: "1rem",
              margin: "0.4rem",
              padding: "0.3rem",
              maxWidth: "70%",
              borderRadius: "6px",
            }}
          >
            Message 2
          </Typography>
        </Box>
        {/* Message 1 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "start",
          }}
        >
          <Typography
            sx={{
              bgcolor: "#004693",
              color: "#fff",
              fontSize: "1rem",
              margin: "0.4rem",
              padding: "0.3rem",
              maxWidth: "70%",
              borderRadius: "6px",
            }}
          >
            Message 1
          </Typography>
        </Box>
        {/* Message 2 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
          }}
        >
          <Typography
            sx={{
              bgcolor: "#f2f2f2",
              color: "#000",
              fontSize: "1rem",
              margin: "0.4rem",
              padding: "0.3rem",
              maxWidth: "70%",
              borderRadius: "6px",
            }}
          >
            Message 2
          </Typography>
        </Box>
        {/* ------------ */}
      </Box>
      {/* Bottom Part */}
      <Box
        sx={{
          width: "100%",
          height: "60px",
          borderRadius: "0 0 12px 12px",
        }}
      >
        <Divider sx={{ width: "100%" }} />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TextField
            id="ChatMsgBox"
            variant="standard"
            type="text"
            placeholder="أكتب هنا .."
            fullWidth
            sx={{
              width: "80%",
              border: "none",
              paddingX: "5px",
              outline: "none",
            }}
            InputProps={{
              style: {
                borderRadius: 0,
                border: "none",
                outline: "none",
              },
              disableUnderline: true,
            }}
          />
          <Box
            sx={{
              width: "20%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "gray",
            }}
          >
            <AttachFileSharpIcon sx={{ transform: "skew(-19deg, 10deg)" }} />
            <SentimentSatisfiedOutlinedIcon />
            <GifBoxOutlinedIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBox;
