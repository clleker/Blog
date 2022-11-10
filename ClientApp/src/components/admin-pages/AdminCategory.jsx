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
import * as apiCategory from "../../api/category-api";
import {
  categories_upper_str,
  cancel_str,
  category_upper_str,
  required_field_str,
} from "../../helper/constant/global-constant";
import {
  PlusSquareOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function AdminCategory() {
  //function component hook fark yoktur.

  //State  //degişken  //deger atama metodu
  const [categories, setCategories] = useState([]); //initial value
  const [flags, setFlags] = useState({tagModalVisible: false, operationTitle: "",});
  const [categoryForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

  useEffect(() => {
    getList();
  }, []); //Tek sefer çalış document ready

  const getList = () => {
    apiCategory.getListForAdmin().then((result) => {
      setCategories(result.data);
    });
  };

  const addOrUpdate = (category) => {
    if (category.id === 0) apiCategory.add(category).then(operationResult);
    else apiCategory.update(category).then(operationResult);
  };

  const operationResult = (response) => {
    if(!response.successful){
      message.error(response.message);
      categoryForm.resetFields();
      return;
    }

    message.success(response.message);
    getList();
    setFlags({ ...flags, tagModalVisible: false });
    categoryForm.resetFields();
  };

  const deleteTag = (id) => {
    apiCategory.deleteCategory(id).then((response) => {
      message.success(response.message);
      getList();
    });
  };

  const fillCategoryForm = (tag) => {
    categoryForm.setFieldsValue(tag);
  };

  const columns = [
    {
      title: "Kategori İsmi",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Renk Kodu",
      dataIndex: "colorHex",
      key: "colorHex",
    },
    {
      title: "Makale Sayısı",
      dataIndex: "articleCount",
      key: "articleCount",
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
                categoryForm.resetFields();
                setFlags({
                  ...flags,
                  tagModalVisible: true,
                  operationTitle: "Update",
                });
                fillCategoryForm(tag);
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
        categoryForm.resetFields();
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
              {categories_upper_str}
            </span>
          }
          key="1"
        >
          <div className="site-card-border-less-wrapper">
            <Table bordered size="small" columns={columns} dataSource={categories} />
          </div>
        </Tabs.TabPane>
      </Tabs>

      <Modal
        title={category_upper_str}
        visible={flags.tagModalVisible}
        onCancel={() =>
          setFlags({
            ...flags,
            tagModalVisible: false,
            operationTitle: "EKLE",
          })
        }
        onOk={() => {
          categoryForm.submit();
        }}
        okText={flags.operationTitle}
        cancelText={cancel_str}
        // confirmLoading={loading}
      >
        <Form
          form={categoryForm}
          layout={"horizontal"}
          onFinish={addOrUpdate}
          {...formItemLayout}
          size={"small"}
          labelAlign={"left"}
        >
          <Form.Item name={"id"} hidden={true} initialValue={0}><Input /></Form.Item>
          <Form.Item
            label={"Kategori Adı"}
            name="categoryName"
            rules={[{ required: true, message: required_field_str }]}
          >
            <Input placeholder={"Kategori Adı"} />
          </Form.Item>
          <Form.Item
            label={"Açıklama"}
            name="description"
          >
            <Input placeholder={"Açıklama"} />
          </Form.Item>
          <Form.Item
            label={"Renk Kodu"}
            name="colorHex"
            rules={[{ required: true, message: required_field_str }]}
          >
            <Input placeholder={"Renk Kodu"} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AdminCategory;
