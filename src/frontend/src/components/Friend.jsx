import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();

  const { userId } = useSelector((state) => state.user);
  const userToken = useSelector((state) => state.token);
  const userFriend = useSelector((state) => state.user.friends);

  const isFriend = userFriend.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    dispatch(setFriends({ userFriend: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={palette.neutral.main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={palette.neutral.medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: palette.primary.dark }} />
        ) : (
          <PersonAddOutlined sx={{ color: palette.primary.dark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;