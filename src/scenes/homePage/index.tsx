import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import Navbar from "../navabar";
import {
  AdvertWidget,
  UserWidget,
  MyPostWidget,
  PostsWidget,
  FriendsListWidget,
} from "../widgets";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("( min-width: 1000px )");
  const user = useSelector((state: any) => state.user);
  console.log(user)
  const { _id, picturePath } = user;
  return (
    <Box>
      <Navbar />
      {_id && picturePath && (
        <Box
          width={"100%"}
          padding={"2rem 6%"}
          display={isNonMobileScreens ? "flex" : "block"}
          justifyContent={"space-between"}
          gap="0.5rem"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            m={isNonMobileScreens ? undefined : "2rem"}
          >
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id} />
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis={"26%"}>
              <AdvertWidget />
              <FriendsListWidget userId={_id} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
