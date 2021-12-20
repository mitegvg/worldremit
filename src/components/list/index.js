import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {ListItem, Avatar, Button, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import propTypes from 'prop-types';
import {
  buttonStyle,
  accordionStyle,
  reputationStyle,
  contentStyle,
  followingIndicatorStyle,
  disabledStyle,
  titleStyle,
} from '../../styles/default';
import {expandUser} from '../../utils/listUtils';

import {getUsersFromStackOverflow} from '../../services/fetchApi';
const List = props => {
  const [userList, setUserList] = useState(props.defaultData || []);
  const [blocked, setBlocked] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [expanded, setExpanded] = useState({});

  const blockUserFunc = id => {
    setBlocked([...blocked, id]);
    expandUser(id, expanded, setExpanded);
  };
  const followUserFunc = id => {
    const isFollowed = followed.filter(f => f === id).length > 0;
    if (isFollowed) {
      setFollowed([...followed.filter(f => f !== id)]);
    } else {
      setFollowed([...followed, id]);
    }
    expandUser(id, expanded, setExpanded);
  };
  const blockUser = props.blockUser || blockUserFunc;
  const followUser = props.followUser || followUserFunc;
  useEffect(async () => {
    getUsersFromStackOverflow().then(response => setUserList(response.items));
  }, []);

  return (
    <SafeAreaView>
      <Text style={titleStyle}>List of Users</Text>
      {userList.map((l, i) => (
        <ListItem.Accordion
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#eeeeee', '#dddddd'],
            start: {x: 0.5, y: 0},
            end: {x: 0.5, y: 1},
          }}
          key={'user-' + i}
          disabled={blocked.filter(b => b === l.account_id).length > 0}
          disabledStyle={disabledStyle}
          content={
            <>
              <Avatar title={l.display_name} source={{uri: l.profile_image}} />
              <ListItem.Content style={contentStyle}>
                <ListItem.Title>
                  {l.display_name}{' '}
                  {followed.filter(f => f === l.account_id).length > 0 ? (
                    <Text style={followingIndicatorStyle}>subscribed</Text>
                  ) : null}
                </ListItem.Title>
                <ListItem.Subtitle style={reputationStyle}>
                  {l.reputation}{' '}
                </ListItem.Subtitle>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded[l.account_id] || false}
          onPress={() => expandUser(l.account_id, expanded, setExpanded)}>
          <View style={accordionStyle}>
            <Button
              nativeId={'followUser-' + l.account_id}
              icon={
                <Icon name="user" type="font-awesome" size={15} color="white" />
              }
              iconLeft
              title={
                followed.filter(f => f === l.account_id).length > 0
                  ? ' Unfollow'
                  : ' Follow'
              }
              onPress={() => followUser(l.account_id)}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['#3d49b8', '#737feb'],
                start: {x: 0.5, y: 0},
                end: {x: 0.5, y: 1},
              }}
              buttonStyle={buttonStyle}
            />
            <Button
              icon={<Icon name="shield" size={15} color="white" />}
              onPress={() => blockUser(l.account_id)}
              iconLeft
              nativeId={'blockUser-' + l.account_id}
              title=" Block"
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['#eb6960', 'red'],
                start: {x: 0.5, y: 0},
                end: {x: 0.5, y: 1},
              }}
              buttonStyle={buttonStyle}
            />
          </View>
        </ListItem.Accordion>
      ))}
    </SafeAreaView>
  );
};

List.propTypes = {
  followUser: propTypes.func,
  blockUser: propTypes.func,
  defaultData: propTypes.array,
};

export default List;
