import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button,Form,Input,message} from "antd";
import React,{useEffect,useState} from "react";
import {add} from "../../api/subscribe-api";

export default function Subscribe() {
 const [subscribeForm] = Form.useForm();

const submit = (subscribe) =>{
  add(subscribe).then(response => {
    if(!response.successful){
      message.error(response.message);
      return;
    } 
      message.success(response.message,4);
      subscribeForm.resetFields();
  })
}

  return (
    <>
      <section className="widget subscribe">
        <div className="inner">
          <h3 className="widget-title">Abone Ol</h3>
          <hr />
          <p>
            Abone olarak blog daki yeni makale ve gelişmelerden haberdar olabilirsiniz. Kayıt olunan email'inize
            gelişmeler mail olarak gönderilecektir. 
          </p>
          <FontAwesomeIcon
            id="envelope"
            size="lg"
            icon="fa-regular fa-envelope"
          />
          <div id="mc_embed_signup">
            {" "}
            <Form
              form={subscribeForm}
              onFinish={submit}
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
            >
              {" "}
              <div id="mc_embed_signup_scroll">
                {" "}
                <div className="mc-field-group">
                  {" "}
                  <label htmlFor="mce-EMAIL">Email Address </label>{" "}
                  <Form.Item name={"id"}  hidden={true} initialValue={0} ><Input /></Form.Item>
                  <Form.Item 
                  noStyle
                  name={"email"}
                  rules={[{type: 'email',message:'is not a valid email!' },
                          {required: true}]}
                  >
                  <Input
                    style={{position:"static"}}
                    type="email"
                    id="mce-EMAIL"
                    placeholder="Email Address..."
                  />
                  </Form.Item>
                  {" "}
                </div>{" "}
                <div id="mce-responses" className="clear">
                  {" "}
                  <div
                    className="response"
                    id="mce-error-response"
                    style={{ display: "none" }}
                  />{" "}
                  <div
                    className="response"
                    id="mce-success-response"
                    style={{ display: "none" }}
                  />{" "}
                </div>{" "}
                <div className="clear">
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="circle"
                    icon={<FontAwesomeIcon icon="fa-solid fa-chevron-right" />}
                    size={"medium"}
                  />
                </div>{" "}
              </div>{" "}
            </Form>{" "}
          </div>{" "}
        </div>
      </section>
    </>
  );
}
