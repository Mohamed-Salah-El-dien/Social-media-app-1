import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserImage from "../UserImage";
import FlexBetween from "../FlexBetween";
import WidgetWrapper from "../WidgetWrapper";

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

const UserWidget = ({ userId, picturePath }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();

  const appUserId = useSelector((state) => state.auth.user._id);
  const user = useSelector((state) => state.auth.user);
  const userFriends = useSelector((state) => state.auth.user.friends);
  const profile = useSelector((state) => state.auth.profile);
  const profileFriends = useSelector((state) => state.auth.profileFriends);

  // checks if in the home page or in the user's
  // profile page
  const isMe = userId === undefined || userId === appUserId;

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

  if (!user || !profile) {
    return null;
  }

  return (
    <WidgetWrapper>
      {/* First row */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          {picturePath && <UserImage image={picturePath} />}

          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {isMe ? user.firstName : profile.firstName}
              {isMe ? user.lastName : profile.lastName}
            </Typography>

            {isMe && (
              <Typography color={medium}>
                {userFriends.length} friends
              </Typography>
            )}
            {!isMe && (
              <Typography color={medium}>
                {profileFriends.length} friends
              </Typography>
            )}
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* Second row */}

      <Box p="1rem 0">
        {user.location || profile.location ? (
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />

            <Typography color={medium}>
              {isMe ? user.location : profile.location}
            </Typography>
          </Box>
        ) : (
          <div />
        )}

        {user.occupation || profile.occupation ? (
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />

            <Typography color={medium}>
              {isMe ? user.occupation : profile.occupation}
            </Typography>
          </Box>
        ) : (
          <div />
        )}
      </Box>

      <Divider />

      {/* Third row */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>

          <Typography color={main} fontWeight="500">
            {isMe ? user.viewedProfile : profile.viewedProfile}
          </Typography>
        </FlexBetween>

        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>

          <Typography color={main} fontWeight="500">
            {isMe ? user.impressions : profile.impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* Fourth row */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />

            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>

              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>

          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />

            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>

              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>

          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
