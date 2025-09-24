import { PlusOutlined } from '@ant-design/icons';
import {
  type ActionType,
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import type { FC } from 'react';
import { addEpg } from '@/services/epg';

interface CreateFormProps {
  reload?: ActionType['reload'];
}
const CreateForm: FC<CreateFormProps> = (props) => {
  const { reload } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const { run, loading } = useRequest(addEpg, {
    manual: true,
    onSuccess: () => {
      messageApi.success('新增EPG成功');
      reload?.();
    },
    onError: () => {
      messageApi.error('新增EPG失败，请重试！');
    },
  });
  return (
    <>
      {contextHolder}
      <ModalForm
        title={'新增EPG'}
        trigger={
          <Button type="primary" icon={<PlusOutlined />}>
            新建
          </Button>
        }
        width="400px"
        modalProps={{
          okButtonProps: {
            loading,
          },
        }}
        onFinish={async (value) => {
          await run(value as API.EpgForm);
          return true;
        }}
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
export default CreateForm;
