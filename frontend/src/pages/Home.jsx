import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import leoProfanity from "leo-profanity";

import { getChannels } from "../api/channelsApi";
import { getMessages, sendMessage } from "../api/messagesApi";
import {
  addChannel,
  setChannels,
  setCurrentChannel,
  removeChannel,
  renameChannel,
} from "../slices/channelsSlice";
import { setMessages, addMessage } from "../slices/messagesSlice";

import AddChannelModal from "./components/modals/AddChannelModal";
import RemoveChannelModal from "./components/modals/RemoveChannelModal";
import RenameChannelModal from "./components/modals/RenameChannelModal";

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);
  const username = useSelector((state) => state.auth.username);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  useEffect(() => {
    (getChannels().then((response) => {
      dispatch(setChannels(response.data));
      const generalChannel = response.data.find(
        (channel) => channel.name === "general",
      );
      dispatch(setCurrentChannel(generalChannel.id));
    }),
      getMessages().then((response) => {
        dispatch(setMessages(response.data));
      }));
  }, []);
  useEffect(() => {
    const socket = io();
    socket.on("newMessage", (data) => {
      dispatch(addMessage(data));
    });
    socket.on("newChannel", (data) => {
      dispatch(addChannel(data));
    });
    socket.on("removeChannel", (data) => {
      dispatch(removeChannel(data.id));
    });
    socket.on("renameChannel", (data) => {
      dispatch(renameChannel({ id: data.id, name: data.name }));
    });
    return () => socket.disconnect();
  }, []);

  const [messageText, setMessageText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState(null);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [channelToRename, setChannelToRename] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    if (!messageText.trim()) return;
    setSending(true);
    const cleanBody = leoProfanity.clean(messageText);
    const messageData = {
      body: cleanBody,
      channelId: currentChannelId,
      username,
    };

    sendMessage(messageData)
      .then(() => {
        setMessageText("");
        return getMessages();
      })
      .then((response) => {
        dispatch(setMessages(response.data));
      })
      .catch(() => {
        toast.error(t("toast.connectionErr"));
      })
      .finally(() => {
        setSending(false);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column p-0 overflow-hidden">
      <div className="row h-100 g-0">
        <div
          className="col-3 text-white p-3"
          style={{ backgroundColor: "#344e41" }}
        >
          <ul className="list-unstyled p-0 m-0">
            {channels.map((channel) => (
              <li
                key={channel.id}
                className={`d-flex justify-content-between align-items-center py-2 px-3 border-bottom border-secondary border-opacity-50 ${channel.id === currentChannelId ? "active" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => dispatch(setCurrentChannel(channel.id))}
                  className="btn p-0 border-0 text-start text-white w-100 shadow-none"
                  style={{ cursor: "pointer" }}
                >
                  {`# ${channel.name}`}
                </button>

                {channel.removable && (
                  <Dropdown onClick={(e) => e.stopPropagation()}>
                    <Dropdown.Toggle
                      split
                      variant="group-vertical"
                      className="text-white p-0 border-0 shadow-none"
                      id={`channel-dropdown-${channel.id}`}
                    >
                      <span className="visually-hidden">
                        Управление каналом
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={(e) => {
                          e.stopPropagation();
                          setChannelToRename(channel);
                          setDeleteModalOpen(false);
                          setRenameModalOpen(true);
                        }}
                      >
                        {t("dropdown.rename")}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => {
                          e.stopPropagation();
                          setChannelToDelete(channel);
                          setRenameModalOpen(false);
                          setDeleteModalOpen(true);
                        }}
                      >
                        {t("dropdown.delete")}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </li>
            ))}
          </ul>
          <button
            variant="outline-light"
            className="w-100 mt-3 fw-bold border-0 shadow-sm rounded-2"
            style={{ backgroundColor: "#a3b18a", color: "#344e41" }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            + {t("chat.createChannel")}
          </button>
        </div>
        <div
          className="col-9 d-flex flex-column"
          style={{ backgroundColor: "#EDEDE8" }}
        >
          <div className="flex-grow-1 overflow-auto p-3">
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
              {messages
                .filter((message) => message.channelId === currentChannelId)
                .map((message) => (
                  <li
                    key={message.id}
                    className="p-3 bg-white rounded-3 shadow-sm border border-0"
                    style={{ maxWidth: "80%" }}
                  >
                    <strong className="text-success me-2">
                      {message.username}:
                    </strong>
                    <span>{message.body}</span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="mt-auto p-3 border-top">
            <form onSubmit={handleFormSubmit} className="input-group">
              <input
                aria-label={t("chat.newMessage")}
                placeholder={t("chat.newMessage")}
                className="form-control"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                disabled={sending}
              />
              <button
                type="submit"
                className="btn fw-bold px-4 shadow-sm"
                style={{ backgroundColor: "#344e41", color: "#EDEDE8" }}
                disabled={sending}
              >
                {t("chat.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
      <AddChannelModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
      />
      <RemoveChannelModal
        show={deleteModalOpen}
        onHide={() => setDeleteModalOpen(false)}
        channel={channelToDelete}
      />
      <RenameChannelModal
        show={renameModalOpen}
        onHide={() => setRenameModalOpen(false)}
        channel={channelToRename}
      />
    </div>
  );
};

export default Home;
