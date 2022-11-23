import { useMutation } from '@apollo/react-hooks';
import React, { useRef, useEffect } from 'react';
import { CREATE_MESSAGE } from '../../../../requests/requests';
import { useForm } from '../../../../utility/hooks';

export const MessengerChatForm = ({ user, context }) => {
  const messageInput = useRef(null);
  const { onChange, onSubmit, values } = useForm(messageHandler, {
    text: '',
  });
  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE, {
    update(proxy, { data: { createMessage: messageData } }) {
      // setMessage([...message, messageData]);
    },
    onError({ graphQLErrors }) {
      console.log(graphQLErrors);
    },
    variables: {
      messageInput: { text: values.text, createdBy: context._id, createdFor: user._id },
    },
  });

  function messageHandler() {
    if (messageInput.current.value.length > 0) {
      createMessage();
      messageInput.current.value = '';
    }
  }

  useEffect(() => {
    return () => {
      values.createdBy = context._id;
      values.createdFor = user._id;
      values.text = '';
    };
  }, [context._id, user._id, values]);

  return (
    <form className="d-flex">
      <input
        type="text"
        className="messenger__chat-form-input"
        name="text"
        onChange={onChange}
        placeholder="Текст сообщения..."
        ref={messageInput}
      />
      <button type="submit" className="btn" onClick={onSubmit}>
        Отправить
      </button>
    </form>
  );
};
