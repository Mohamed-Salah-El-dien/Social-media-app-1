import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Friend from "../Friend";
import WidgetWrapper from "../WidgetWrapper";
import { authActions } from "../../state/authSlice";

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const appUserId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const friends = useSelector((state) => state.auth.user.friends);
  const profileFriends = useSelector((state) => state.auth.profileFriends);

  // checks if in the home page or in the user's
  // profile page
  const isMe = userId === undefined || userId === appUserId;

  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////

  const getFriends = async () => {
    // get the friends of the user incase in the home page
    // or in the user's profile
    if (isMe) {
      const response = await fetch(
        `http://localhost:4000/users/${appUserId}/friends`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      dispatch(authActions.setFriends({ friends: data }));
    } else {
      // incase in another user's profile
      // get that user's friends
      const response = await fetch(
        `http://localhost:4000/users/${userId}/friends`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      dispatch(authActions.setProfileFriends(data));
    }
  };

  useEffect(() => {
    getFriends();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (friends.length > 0 || profileFriends) {
    return (
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Friend List
        </Typography>

        {isMe && friends.length > 0 && (
          <Box display="flex" flexDirection="column" gap="1.5rem">
            {friends.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
              />
            ))}
          </Box>
        )}

        {!isMe && profileFriends.length > 0 && (
          <Box display="flex" flexDirection="column" gap="1.5rem">
            {profileFriends.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
              />
            ))}
          </Box>
        )}
      </WidgetWrapper>
    );
  } else {
    return <h1>oops</h1>;
  }
};

export default FriendListWidget;
