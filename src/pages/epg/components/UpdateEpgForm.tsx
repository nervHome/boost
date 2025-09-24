import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { message } from 'antd';
import React, { cloneElement, useCallback, useState } from 'react';
import { updateEpg } from '@/services/epg';
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.EpgListItem>;
export type UpdateFormProps = {
  trigger?: React.ReactElement<any>;
  onOk?: () => void;
  values: Partial<API.EpgListItem>;
};
const UpdateEpgForm: React.FC<UpdateFormProps> = (props) => {
  const { onOk, values, trigger } = props;
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { run, loading } = useRequest(updateEpg, {
    manual: true,
    onSuccess: () => {
      messageApi.success('更新成功');
      onOk?.();
    },
    onError: () => {
      messageApi.error('更新失败，请重试！');
    },
  });
  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);
  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const onFinish = useCallback(
    async (values?: any) => {
      await run({
        ...values,
        id: props.values.id,
      });
      onCancel();
    },
    [onCancel, run],
  );
  return (
    <>
      {contextHolder}
      {trigger
        ? cloneElement(trigger, {
            onClick: onOpen,
          })
        : null}
      <ModalForm
        title={'新增EPG'}
        open={open}
        width="400px"
        initialValues={values}
        modalProps={{
          okButtonProps: {
            loading,
          },
        }}
        onFinish={onFinish}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          label="名称"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'EPG ID为必填项',
            },
          ]}
          width="md"
          label="EPG ID"
          name="epgId"
        />
        <ProFormSelect
          rules={[
            {
              required: true,
              message: '语言为必填项',
            },
          ]}
          width="md"
          label="语言"
          name="language"
          options={[
            {
              value: 'zh',
              label: '中文',
            },
            {
              value: 'en',
              label: '英文',
            },
          ]}
        ></ProFormSelect>
        <ProFormText width="md" label="地址" name="xmlUrl"></ProFormText>
        <ProFormTextArea width="md" name="remark" label="备注" />
      </ModalForm>
    </>
  );
};
export default UpdateEpgForm;
