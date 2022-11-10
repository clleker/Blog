import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Form,
  Input,
  Modal,
  Tabs,
  Tooltip,
  message,
  Popconfirm,
} from "antd";
import * as apiSocialMedia from "../../api/socialmedia-api";
import {
  tag_str,
  tag_upper_str,
  cancel_str,
  required_field_str,
} from "../../helper/constant/global-constant";
import {
  PlusSquareOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function AdminSocialMedia() {
  //function component hook fark yoktur.

  //State  //degişken  //deger atama metodu
  const [socialMedia, setSocialMedia] = useState([]); //initial value
  const [flags, setFlags] = useState({socialMediaModalVisible: false, operationTitle: "",});
  const [socialMediaForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

  useEffect(() => {
    getList();
  }, []); //Tek sefer çalış document ready

  const getList = () => {
    apiSocialMedia.getList().then((result) => {
      setSocialMedia(result.data);
    });
  };

  const addOrUpdate = (socialMedia) => {
    if (socialMedia.id === 0) apiSocialMedia.add(socialMedia).then(operationResult);
    else apiSocialMedia.update(socialMedia).then(operationResult);
  };

  const operationResult = (response) => {
    if(!response.successful){
      message.error(response.message);
      socialMediaForm.resetFields();
      return;
    }

    message.success(response.message);
    getList();
    setFlags({ ...flags, socialMediaModalVisible: false });
    socialMediaForm.resetFields();
  };

  const deleteSocialMedia = (id) => {
    apiSocialMedia.deleteSocialMedia(id).then((response) => {
      message.success(response.message);
      getList();
    });
  };

  const fillSocialMediaForm = (socialMedia) => {
    socialMediaForm.setFieldsValue(socialMedia);
  };

  const columns = [
    {
      title: "Etiket",
      dataIndex: "title",
      key: "Title",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "Link",
    },
    {
      title: "Css Class İsmi",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Ikon",
      dataIndex: "icon",
      key: "Icon",
    },
    {
      key: "operations",
      width: 120,
      render: (text, tag) => (
        <>
          <Tooltip placement="top" color="blue" title={"GÜNCELLE"}>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                socialMediaForm.resetFields();
                setFlags({
                  ...flags,
                  socialMediaModalVisible: true,
                  operationTitle: "Update",
                });
                fillSocialMediaForm(tag);
              }}
            />
          </Tooltip>
          <Tooltip placement="bottom" color="red" title={"SİL"}>
            <Popconfirm
              title="Silmek İstediğinize Emin Misiniz ?"
              onConfirm={() => {
                deleteSocialMedia(tag.id);
              }}
              okText={"EVET"}
              cancelText={"HAYIR"}
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  const header = (
    <Button
      type="primary"
      onClick={() => {
        socialMediaForm.resetFields();
        setFlags({
          ...flags,
          socialMediaModalVisible: true,
          operationTitle: "EKLE",
        });
      }}
      icon={
        <PlusSquareOutlined
          style={{ verticalAlign: "middle", fontSize: "20px" }}
        />
      }
    >
      <span style={{ verticalAlign: "middle" }}>{"EKLE"}</span>
    </Button>
  );
  const [activeKey, setActiveKey] = React.useState("1");
  const onKeyChange = (key) => setActiveKey(key);
  return (
    <>
      {/* Tag */}

      <Tabs defaultActiveKey="1" tabBarExtraContent={header}>
        <Tabs.TabPane
          tab={
            <span className="tabHeaderTitle">
              <UserOutlined />
              {tag_upper_str}
            </span>
          }
          key="1"
        >
          <div className="site-card-border-less-wrapper">
            <Table bordered size="small" columns={columns} dataSource={socialMedia} />
          </div>
        </Tabs.TabPane>
      </Tabs>

      <Modal
        title={tag_str}
        visible={flags.socialMediaModalVisible}
        onCancel={() =>
          setFlags({
            ...flags,
            socialMediaModalVisible: false,
            operationTitle: "EKLE",
          })
        }
        onOk={() => {
          socialMediaForm.submit();
        }}
        okText={flags.operationTitle}
        cancelText={cancel_str}
        // confirmLoading={loading}
      >
        <Form
          form={socialMediaForm}
          layout={"horizontal"}
          onFinish={addOrUpdate}
          {...formItemLayout}
          size={"small"}
          labelAlign={"left"}
        >
          <Form.Item name={"id"} hidden={true} initialValue={0}>
            <Input />
          </Form.Item>
          <Form.Item
            label={"Etiket"}
            name="title"
            rules={[{ required: true, message: required_field_str }]}
          >
            <Input placeholder={"Etiket"} />
          </Form.Item>
          <Form.Item
            label={"Link"}
            name="link"
            rules={[{ required: true, message: required_field_str }]}
          >
            <Input placeholder={"Link"} />
          </Form.Item>
          <Form.Item
            label={"CSS Class"}
            name="className"
            rules={[{ required: true, message: required_field_str }]}
          >
            <Input placeholder={"CSS Class"} />
          </Form.Item>
          <Form.Item
            label={"İkon"}
            name="icon"
            rules={[{ required: true, message: required_field_str }]}
          >
            <Input placeholder={"İkon"} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AdminSocialMedia;
