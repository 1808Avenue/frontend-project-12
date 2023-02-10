import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import { toast } from 'react-toastify';
import { useSocket } from '../../contexts/SocketContext';

const Add = (props) => {
  const { channels } = useSelector((store) => store.chat.content);
  const channelNames = channels.map(({ name }) => name);
  const { createChannel } = useSocket();
  const inputEl = useRef(null);
  const { t } = useTranslation();

  const { handlers } = props;
  const { hideModal } = handlers;

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      name: Yup.string().trim()
        .required(t('modals.addChannel.validation.requiredField'))
        .min(3, t('modals.addChannel.validation.channelNameLength'))
        .max(20, t('modals.addChannel.validation.channelNameLength'))
        .notOneOf(channelNames, t('modals.addChannel.validation.channelNameExists')),
    }),
    onSubmit: (values, { resetForm }) => {
      createChannel(values);
      resetForm(formik.initialValues);
      hideModal();
      toast.success(t('notifications.success.channelCreated'));
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <Modal centered show>
      <Modal.Header>
        <Modal.Title>{t('modals.addChannel.header')}</Modal.Title>
        <CloseButton onClick={hideModal} aria-label="Close" data-bs-dismiss="modal" />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              id="name"
              className="mb-2"
              ref={inputEl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.errors.name}
              autoComplete="off"
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modals.addChannel.inputLabel')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                onClick={hideModal}
                variant="secondary"
                className="me-2"
              >
                {t('modals.addChannel.cancelButton')}
              </Button>
              <Button type="submit">{t('modals.addChannel.submitButton')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
