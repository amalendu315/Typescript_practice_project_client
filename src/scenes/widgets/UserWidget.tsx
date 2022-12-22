import React,{ useEffect, useState } from 'react';
import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from '@mui/icons-material';
import { Box, Divider, useTheme, Typography } from '@mui/material';
import { UserImage, FlexBetween, WidgetWrapper } from '../../components';
import { setLoading } from '../../state';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserWidget = (userId:any, picturePath:string) => {

  console.log(userId)
  console.log(picturePath)

  const [user, setUser] = useState(null || undefined);
  const { palette } :any = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state:any) => state.token);
  const loading = useSelector((state:any) => state.loading);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    try {
      if(userId !== null){
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUser(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  },[])

  if (!user) return null;

  const { 
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
   } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap={"1rem"}>
          <UserImage image={picturePath} />
          <Box>
            <Typography variant="h4" fontWeight="500" color={dark} sx={{
              "&:hover": {
                cursor: "pointer",
                color: palette.primary.light,
                },
              }} 
            >
              {firstName} {lastName}
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
}

export default UserWidget