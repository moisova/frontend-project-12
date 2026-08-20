import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { deleteChannel } from "../../../api/channelsApi";

const RemoveChannelModal = ({ show, onHide, channel }) => {
  const { t } = useTranslation();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    if (!channel) return;
    setDeleting(true);

    deleteChannel(channel.id)
      .then(() => {
        onHide();
        toast.success(t("toast.deleted"));
      })
      .catch(() => {
        toast.error(t("toast.connectionErr"));
      })
      .finally(() => setDeleting(false));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton style={{ backgroundColor: "#344e41" }}>
        <Modal.Title className="fs-5 fw-bold" style={{ color: "#EDEDE8" }}>
          {t("modal.deleteChannel")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="p-4"
        style={{ backgroundColor: "#EDEDE8", color: "#344e41" }}
      >
        <p className="mb-0 fs-6">
          {/* Безопасно выводим имя через опциональную цепочку channel?.name */}
          {t("modal.deleteConfirm", { name: channel?.name })}
        </p>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#EDEDE8" }}>
        <Button
          variant="secondary"
          className="rounded-3"
          onClick={onHide}
          disabled={deleting}
        >
          {t("modal.cancel")}
        </Button>
        <Button
          variant="danger"
          className="rounded-3 px-4 fw-semibold"
          onClick={handleDelete}
          disabled={deleting}
        >
          {t("modal.delete")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
