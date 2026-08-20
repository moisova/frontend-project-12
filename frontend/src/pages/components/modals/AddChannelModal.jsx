import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import leoProfanity from "leo-profanity";

import { createChannel } from "../../../api/channelsApi";
import { setCurrentChannel } from "../../../slices/channelsSlice";
import { channelValidator } from "../../../validators/channelValidator";

const AddChannelModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [creating, setCreating] = useState(false);
  const channels = useSelector((state) => state.channels.channels);

  useEffect(() => {
    if (show) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton style={{ backgroundColor: "#344e41" }}>
        <Modal.Title className="fs-5 fw-bold" style={{ color: "#EDEDE8" }}>
          {t("modal.createChannel")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4" style={{ backgroundColor: "#EDEDE8" }}>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={channelValidator(channels.map((c) => c.name))}
          onSubmit={(values, { resetForm }) => {
            setCreating(true);
            const cleanName = leoProfanity.clean(values.name);
            createChannel({ name: cleanName })
              .then((response) => {
                dispatch(setCurrentChannel(response.data.id));
                onHide(); // ПОЧЕМУ ТАК: Закрываем модалку через переданный пропс onHide
                resetForm(); // Очищаем форму после успешного создания
                toast.success(t("toast.created"));
              })
              .catch(() => {
                toast.error(t("toast.connectionErr"));
              })
              .finally(() => setCreating(false));
          }}
        >
          {() => (
            <Form>
              <label htmlFor="name" className="form-label fw-semibold">
                {t("modal.channelName")}
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                innerRef={inputRef}
                className="form-control rounded-3 border-0 shadow-sm"
              />
              <ErrorMessage
                name="name"
                render={(msg) => (
                  <div className="text-danger small mt-1">{t(msg)}</div>
                )}
              />
              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button
                  variant="secondary"
                  onClick={onHide}
                  disabled={creating}
                >
                  {t("modal.cancel")}
                </Button>
                <Button
                  type="submit"
                  className="btn fw-bold rounded-3 px-4 border-0 shadow-sm"
                  style={{ backgroundColor: "#344e41", color: "#EDEDE8" }}
                  disabled={creating}
                >
                  {t("modal.createChannel")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
