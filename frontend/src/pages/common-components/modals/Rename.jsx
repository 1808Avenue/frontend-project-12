import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import * as leoProfanity from 'leo-profanity';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import { toast } from 'react-toastify';
import { hideModal, selectModalState } from '../../../slices/modalSlice.js';
import { selectChannelNames } from '../../../slices/channelsSlice.js';
import { useSocket } from '../../../contexts/SocketContext.jsx';

const Rename = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameChannel } = useSocket();
  const channelNames = useSelector(selectChannelNames);
  const { data } = useSelector(selectModalState);
  const currentChannel = data;
  const inputEl = useRef(null);

  const handleRenameChannel = (renamedChannel) => {
    renameChannel(renamedChannel);
  };

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      name: Yup.string().trim()
        .required('modals.renameChannel.validation.requiredField')
        .min(3, 'modals.renameChannel.validation.channelNameLength')
        .max(20, 'modals.renameChannel.validation.channelNameLength')
        .notOneOf(channelNames, 'modals.renameChannel.validation.channelNameExists'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const renamedChannel = {
        id: currentChannel.id,
        name: leoProfanity.clean(values.name),
        removable: currentChannel.removable,
      };
      try {
        await handleRenameChannel(renamedChannel);
        resetForm();
        handleHideModal();
        toast.success(t('notifications.success.channelRenamed'));
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  useEffect(() => {
    inputEl.current.select();
  }, []);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.renameChannel.header')}</Modal.Title>
        <CloseButton onClick={handleHideModal} aria-label="Close" data-bs-dismiss="modal" />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
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
              <Form.Control.Feedback type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>
              <div className="d-flex justify-content-end">
                <Button onClick={handleHideModal} variant="secondary" className="me-2">{t('modals.renameChannel.cancelButton')}</Button>
                <Button type="submit">{t('modals.renameChannel.submitButton')}</Button>
              </div>
            </Form.Group>
          </fieldset>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Rename;
