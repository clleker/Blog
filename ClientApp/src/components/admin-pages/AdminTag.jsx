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
import * as apiTag from "../../api/tag-api";
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

function AdminTag() {
  //function component hook fark yoktur.

  //State  //degişken  //deger atama metodu
  const [tags, setTags] = useState([]); //initial value
  const [flags, setFlags] = useState({tagModalVisible: false, operationTitle: "",});
  const [tagForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

  useEffect(() => {
    getList();
  }, []); //Tek sefer çalış document ready

  const getList = () => {
    apiTag.getListForAdmin().then((result) => {
      setTags(result.data);
    });
  };

  const addOrUpdate = (tag) => {
    if (tag.id === 0) apiTag.add(tag).then(operationResult);
    else apiTag.update(tag).then(operationResult);
  };

  const operationResult = (response) => {
    if(!response.successful){
      message.error(response.message);
      tagForm.resetFields();
      return;
    }

    message.success(response.message);
    getList();
    setFlags({ ...flags, tagModalVisible: false });
    tagForm.resetFields();
  };

  const deleteTag = (id) => {
    apiTag.deleteTag(id).then((response) => {
      message.success(response.message);
      getList();
    });
  };

  const fillTagForm = (tag) => {
    tagForm.setFieldsValue(tag);
  };

  const columns = [
    {
      title: "Etiket Adı",
      dataIndex: "tagName",
      key: "tagName",
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
                tagForm.resetFields();
                setFlags({
                  ...flags,
                  tagModalVisible: true,
                  operationTitle: "Update",
                });
                fillTagForm(tag);
              }}
            />
          </Tooltip>
          <Tooltip placement="bottom" color="red" title={"SİL"}>
            <Popconfirm
              title="Silmek İstediğinize Emin Misiniz ?"
              onConfirm={() => {
                deleteTag(tag.id);
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
        tagForm.resetFields();
        setFlags({
          ...flags,
          tagModalVisible: true,
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
            <Table bordered size="small" columns={columns} dataSource={tags} />
          </div>
        </Tabs.TabPane>
      </Tabs>

      <Modal
        title={tag_str}
        visible={flags.tagModalVisible}
        onCancel={() =>
          setFlags({
            ...flags,
            tagModalVisible: false,
            operationTitle: "EKLE",
          })
        }
        onOk={() => {
          tagForm.submit();
        }}
        okText={flags.operationTitle}
        cancelText={cancel_str}
        // confirmLoading={loading}
      >
        <Form
          form={tagForm}
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
            label={"Etiket Adı"}
            name="tagName"
            rules={[{ required: true, message: required_field_str }]}
          >
            <Input placeholder={"Etiket Adı"} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AdminTag;
