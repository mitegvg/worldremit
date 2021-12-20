import React from 'react';

import renderer from 'react-test-renderer';

import List from '../../src/components/list/index';
const defaultData = [
  {
    display_name: 'Jon Skeet',
    profile_image: 'test.jpg',
    account_id: 111,
  },
];
let wrapper;
describe('List tests', () => {
  beforeAll(() => {
    jest.mock('../../src/services/fetchApi', () => jest.fn());

    jest.useFakeTimers();
    wrapper = renderer.create(<List defaultData={defaultData} />);
  });
  test('should be showing some content', done => {
    const json = wrapper.toJSON();
    expect(json).not.toBe(null);
    expect(json.children[0].children[0]).toBe('List of Users');
    done();
  });
  test('follow user should trigger the follow user function with user id', done => {
    const followUser = id => {
      expect(id).toBe(111);
      done();
    };
    wrapper = renderer.create(
      <List followUser={followUser} defaultData={defaultData} />,
    );
    wrapper.root.findByProps({nativeId: 'followUser-111'}).props.onPress();
  });
  test('unfollow user should trigger the follow user function with user id', done => {
    let timesCalled = 0;
    const followUser = id => {
      expect(id).toBe(111);
      timesCalled++;
      if (timesCalled === 2) {
        done();
      }
    };
    wrapper = renderer.create(
      <List followUser={followUser} defaultData={defaultData} />,
    );
    wrapper.root.findByProps({nativeId: 'followUser-111'}).props.onPress();
    wrapper.root.findByProps({nativeId: 'followUser-111'}).props.onPress();
  });
  test('block user should trigger the block user function with user id', done => {
    const blockUser = id => {
      expect(id).toBe(111);
      done();
    };
    wrapper = renderer.create(
      <List blockUser={blockUser} defaultData={defaultData} />,
    );
    wrapper.root.findByProps({nativeId: 'blockUser-111'}).props.onPress();
  });
});
