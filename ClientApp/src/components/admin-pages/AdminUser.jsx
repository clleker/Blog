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
  Upload,
  TextArea
} from "antd";
import * as apiUser from "../../api/user-api";
import {
  user_str,
  user_upper_str,
  cancel_str,
  required_field_str,
} from "../../helper/constant/global-constant";
import {
  FileImageOutlined,
  UserOutlined,
  EditOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { apiUrl } from "../../helper/constant/api-constant";

function AdminUser() {

  //function component hook fark yoktur.

  //State  //degişken  //deger atama metodu
  const [user, setUser] = useState([]); //initial value
  const [flags, setFlags] = useState({userModalVisible: false, operationTitle: "",imageModalVisible:false});
  const [userForm] = Form.useForm();
  const [profileForm] = Form.useForm();
  const [profileImage,setProfileImage] = useState([])

  const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

  useEffect(() => {
    get();
  }, []); //Tek sefer çalış document ready

  const get = () => {
    apiUser.get().then((result) => {
      setUser([result.data]);
    });
  };

  const uploadImage = (_profileForm) => {
    debugger;
      const formData = new FormData()
      formData.append('id', 1)
      formData.append('imageName', _profileForm.image.file.name)
      formData.append('imageFile', _profileForm.image.file)
      apiUser.uploadImage(formData).then(operationResult);
  };
  const beforeUploadProfileImage = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    return false;
   }

  const update = (user) => {
    apiUser.update(user).then(operationResult);
  };

  const operationResult = (response) => {
    if(!response.successful){
      message.error(response.message);
      userForm.resetFields();
      return;
    }
    message.success(response.message);
    get();
    setFlags({ ...flags, userModalVisible: false });
    userForm.resetFields();
  };

  const fillUserForm = (user) => {
    userForm.setFieldsValue(user);
  };

  const columns = [
    {
      title: "RESİM",
      dataIndex: "imagePath",
      key: "username",
      render: (text, user) => (
        <img src= {apiUrl+user?.imagePath} className="img" alt="My image" style={{width: '75px',borderRadius:"50%"}} />
      )
    },
    {
      title: "KULLANICI ADI",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "ŞİFRE",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "İSİM",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "ÜNVAN",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "AÇIKLAMA",
      dataIndex: "description",
      key: "description",
    },
    {
      key: "operations",
      width: 120,
      render: (text, user) => (
        <>
          <Tooltip placement="top" color="blue" title={"GÜNCELLE"}>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                userForm.resetFields();
                setFlags({
                  ...flags,
                  userModalVisible: true,
                  operationTitle: "Güncelle",
                });
                fillUserForm(user);
              }}
            />
          </Tooltip>
          <Tooltip placement="top" color="blue" title={"RESİM"}>
            <Button
              icon={<FileImageOutlined />}
              onClick={() => {
                setProfileImage([{
                  name:user?.imagePath,
                  uid:user.id,
                  url: apiUrl + user?.imagePath,
                  status: 'done',
                 }])
                setFlags({
                  ...flags,
                  imageModalVisible: true,
                  operationTitle: "GÜNCELLE",
                });
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];


 
  return (
    <>
      {/* user */}

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          tab={
            <span className="tabHeaderTitle">
              <UserOutlined />
              {user_upper_str}
            </span>
          }
          key="1"
        >
          <div className="site-card-border-less-wrapper">
            <Table bordered size="small" columns={columns} dataSource={user} />
          </div>
        </Tabs.TabPane>
      </Tabs>

      <Modal
        title={user_str}
        visible={flags.imageModalVisible}
        onOk={()=>profileForm.submit()}
        onCancel={() =>
          setFlags({
            ...flags,
            imageModalVisible: false,
          })
        }
        cancelText={cancel_str}
        // confirmLoading={loading}
      >
     <Form
          form={profileForm}
          layout={"horizontal"}
          onFinish={uploadImage}
          size={"small"}
          labelAlign={"left"}
        >
  <Form.Item 
      name="image"
      >
      <Upload
      type="select"
      showUploadList={{showRemoveIcon:false}}
      defaultFileList ={profileImage}
      beforeUpload={beforeUploadProfileImage}
      accept='.jpg'
      listType="picture"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Profil Resmi</Button>
    </Upload>
  </Form.Item>
    </Form>
   </Modal>
  

      <Modal
        title={user_str}
        visible={flags.userModalVisible}
        onCancel={() =>
          setFlags({
            ...flags,
            userModalVisible: false,
            operationTitle: "GÜNCELLE",
          })
        }
        onOk={() => {
          userForm.submit();
        }}
        okText={flags.operationTitle}
        cancelText={cancel_str}
        // confirmLoading={loading}
      >
        <Form
          form={userForm}
          layout={"horizontal"}
          onFinish={update}
          {...formItemLayout}
          size={"small"}
          labelAlign={"left"}
        >
          <Form.Item name={"id"} hidden={true} initialValue={0}>
            <Input />
          </Form.Item>
          <Form.Item
            label={"Kullanıcı Adı"}
            name="username"
            rules={[{ required: true, message: required_field_str }]}
          >
            <Input placeholder={"Kullanıcı Adı"} />
          </Form.Item>
          <Form.Item
            label={"İsim"}
            name="fullName"
            rules={[{ required: true, message: required_field_str }]}
          >
            <Input placeholder={"İsim"} />
          </Form.Item>
          <Form.Item
            label={"Ünvan"}
            name="title"
            rules={[{ required: true, message: required_field_str }]}
          >
            <Input placeholder={"Ünvan"} />
          </Form.Item>
          <Form.Item
            label={"Açıklama"}
            name="description"
            rules={[{ required: true, message: required_field_str }]}
          >
             <Input.TextArea
                showCount
                maxLength={150}
                style={{height: 100,}}
              />
          </Form.Item>
          <Form.Item
            label={"Şifre"}
            name="password"
            rules={[{ required: true, message: required_field_str }]}
          >
            <Input.Password placeholder={"Şifre"} />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
}

export default AdminUser;
