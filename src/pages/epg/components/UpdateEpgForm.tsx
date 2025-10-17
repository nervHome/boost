import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useCallback } from 'react';
import { updateEpg } from '@/services/epg';
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.EpgListItem>;
export type UpdateFormProps = {
  onOk?: () => void;
  values: Partial<API.EpgListItem>;
};
const UpdateEpgForm: React.FC<UpdateFormProps> = (props) => {
  const { onOk, values } = props;
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

  const onFinish = useCallback(
    async (values?: any) => {
      await run({
        ...values,
        id: props.values.id,
      });
    },
    [run],
  );
  return (
    <>
      {contextHolder}
      <ModalForm
        trigger={
          <Button type="text" color="primary">
            配置
          </Button>
        }
        title={'新增EPG'}
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
        <ProFormText
          width="md"
          label="地址"
          name="xmlUrl"
          rules={[
            {
              type: 'url',
              message: '请输入合法的URL地址',
            },
          ]}
        ></ProFormText>
        <ProFormTextArea width="md" name="remark" label="备注" />
      </ModalForm>
    </>
  );
};
export default UpdateEpgForm;
