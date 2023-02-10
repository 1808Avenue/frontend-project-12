import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import { toast } from 'react-toastify';

const Rename = (props) => {
  const { channels } = useSelector((store) => store.chat.content);
  const channelNames = channels.map(({ name }) => name);
  const inputEl = useRef(null);
  const { t } = useTranslation();

  const { handlers, data } = props;
  const { hideModal, handleRenameChannel } = handlers;
  const currentChannel = data;

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      name: Yup.string().trim()
        .required(t('modals.renameChannel.validation.requiredField'))
        .min(3, t('modals.renameChannel.validation.channelNameLength'))
        .max(20, t('modals.renameChannel.validation.channelNameLength'))
        .notOneOf(channelNames, t('modals.renameChannel.validation.channelNameExists')),
    }),
    onSubmit: (values, { resetForm }) => {
      const renamedChannel = {
        id: currentChannel.id,
        name: values.name,
        removable: currentChannel.removable,
      };

      handleRenameChannel(renamedChannel);
      resetForm(formik.initialValues);
      hideModal();
      toast.success(t('notifications.success.channelRenamed'));
    },
  });

  useEffect(() => {
    inputEl.current.select();
  }, []);

  return (
    <Modal centered show>
      <Modal.Header>
        <Modal.Title>{t('modals.renameChannel.header')}</Modal.Title>
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
              value={formik.values.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.renameChannel.inputLabel')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={hideModal} variant="secondary" className="me-2">{t('modals.renameChannel.cancelButton')}</Button>
              <Button type="submit">{t('modals.renameChannel.submitButton')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;