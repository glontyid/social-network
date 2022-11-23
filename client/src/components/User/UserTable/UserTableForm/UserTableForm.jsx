import { useMutation } from '@apollo/react-hooks';
import React, { useRef } from 'react';
import { CREATE_POST } from '../../../../requests/requests';
import { useForm } from '../../../../utility/hooks';

export const UserTableForm = ({ currentUser, user, setPosts, posts }) => {
  const postInput = useRef(null);
  const { onChange, onSubmit, values } = useForm(postHandler, {
    userId: user._id,
    author: `${user.lastName} ${user.firstName}`,
    content: '',
    createdTo: currentUser._id,
  });

  const [createPost, { postLoading }] = useMutation(CREATE_POST, {
    update(proxy, { data: { createPost: postData } }) {
      setPosts([...posts, postData]);
    },
    onError({ graphQLErrors }) {
      console.log(graphQLErrors);
    },
    variables: { postInput: values },
  });

  function postHandler() {
    if (postInput.current.value.length > 0) {
      createPost();
      postInput.current.value = '';
    }
  }

  return (
    <form className="profile__table-form d-flex" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="profile__table-form-input"
        name="content"
        onChange={onChange}
        placeholder="Текст поста..."
        ref={postInput}
      />
      <button type="submit" className="btn" onClick={onSubmit}>
        Отправить
      </button>
    </form>
  );
};
