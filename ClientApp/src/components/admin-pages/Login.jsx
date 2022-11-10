import React from 'react'
import { Form, Input, Button } from "antd";
import {Checkbox } from "antd";
import * as apiUser from '../../api/user-api';
import { useNavigate } from 'react-router-dom';
import { adminBaseUrl } from '../../helper/constant/route-constant';
import {login} from '../../redux/actions/authAction'
import {connect} from "react-redux";

  function Login (props) {

  const {login} = props;

  const navigate = useNavigate();

  const submitForm = (user_form) => {
    apiUser.login(user_form.username,user_form.password).then(response=>{
      if(response.successful){
        login(response.data.token)
        navigate(adminBaseUrl)
      }
    })
    
  }

  return (
    <div className="login-cart">
    {/* <Image
      width={100}
      src="https://matrbhumiweb.com/images/noimage.png"
    /> */}
<Form
  style={{width:"50rem"}}
  name="basic"
  labelCol={{ span: 8 }}
  wrapperCol={{ span: 8 }}
  initialValues={{ remember: true }}
  onFinish={submitForm}
  //onFinishFailed={onFinishFailed}
  autoComplete="off"
>
  <Form.Item
    label="Kullanıcı Adı"
    name="username"
    rules={[{ required: true, message: "Kullanıcı adını giriniz!" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Şifre"
    name="password"
    rules={[{ required: true, message: "Şifrenizi giriniz!" }]}
  >
    <Input.Password />
  </Form.Item>

  <Form.Item
    name="remember"
    valuePropName="checked"
    wrapperCol={{ offset: 8, span: 16 }}
  >
    <Checkbox>Beni hatırla</Checkbox>
  </Form.Item>

  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button
      onClick={() => alert("Giriş başarılı")}
      type="primary"
      htmlType="submit"
    >
      Giriş
    </Button>
  </Form.Item>
</Form>
</div>
  )
}


const mapDispatchToProps = {
  login
}

export default connect(null, mapDispatchToProps)(Login)
