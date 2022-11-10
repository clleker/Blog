import React,{useState,useEffect} from 'react'
import * as apiArticle from "../../../api/article-api";

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
import {
  artical_str,
  articals_upper_str,
  cancel_str,
  required_field_str,
} from "../../../helper/constant/global-constant";
import {
  PlusSquareOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  SketchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { setStrLengthLimitByNumber } from '../../../helper/helper-methods';
import { apiUrl } from '../../../helper/constant/api-constant';
import { useNavigate } from 'react-router-dom';
import { adminBaseUrl } from '../../../helper/constant/route-constant';

export default function AdminArticle() {

  const navigate = useNavigate();
  const [articles, setArticle] = useState([]); //initial value
  const [pagination,setPagination] = useState({current:1, pageSize:10, defaultCurrent:1,total:0})

  const [articleFilter, setArticleFilter] = useState({
    columnNameForOrder: null,
    isOrderBy: false,
    articleTitle: null,
    publishDate:null,
    categoryId:null,
    tagId:null,
    pageSize:pagination.pageSize,
    pageNumber:pagination.current
  });

  useEffect(() => {
    getList();
  }, []); //Tek sefer çalış document ready

  const getList = () => {
    apiArticle.getListForAdmin(articleFilter).then((result) => {
      if(result.successful) {
        setArticle(result.data.items);
        setPagination({current:result.data.pageNumber,total:result.data.count,pageSize:result.data.pageSize})
      }
    });
  };

 const updateBanner = (articleId) => {
  apiArticle.updateBannerArticle(articleId).then((result) => {
    if(result.successful) {
      getList();
    }
  });
 }

  const handleChangeTable =  (pagination , filters,sorter) => {
    if( sorter.column =! undefined) {
      

    }else{

    }
    setArticleFilter({
    ...articleFilter,
    pageSize:pagination.pageSize,
    pageNumber:pagination.current,
  })
}

  const deleteArticle = (id) => {
    apiArticle.deleteArticle(id).then((response) => {
      message.success(response.message);
      getList();
    });
  };

  const columns = [
    {
      title: "Başlık Resmi",
      dataIndex: "headerImagePath",
      key: "headerImagePath",
      render: (text, article) => (
        <img src= {apiUrl+article.headerImagePath} className="img" alt="My image" style={{width: '75px',borderRadius:"50%"}} />
      )
    },
    {
      title: "Banner mı ?",
      dataIndex: "isBanner",
      key: "isBanner",
      render: (text, article) => ( article.isBanner ? "EVET":"HAYIR"
      )
    },
    {
      title: "Etiket",
      dataIndex: "title",
      key: "Title",
    },
    {
      title: "Yayınlanma Tarihi",
      dataIndex: "publishDate",
      key: "publishDate",
      render: (text, article) =>
        moment(article.publishDate).format("DD.MM.YYYY"),
    },
    {
      title: "İçerik",
      dataIndex: "contentText",
      key: "contentText",
      render: (text, article) => setStrLengthLimitByNumber(article.contentText,80)
    },
    {
      title: "Begeni Sayısı",
      dataIndex: "likeNumber",
      key: "likeNumber",
    },
    {
      key: "operations",
      width: 120,
      render: (text, article) => (
        <>
            <Tooltip placement="top" color="blue" title={"BANNER"}>
            <Button
              icon={<SketchOutlined />}
              onClick={() => updateBanner(article.id)}
            />
          </Tooltip>
          <Tooltip placement="top" color="blue" title={"GÜNCELLE"}>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                navigate(`${adminBaseUrl}/article-update/${article.id}`)
              }}
            />
          </Tooltip>
          <Tooltip placement="bottom" color="red" title={"SİL"}>
            <Popconfirm
              title="Silmek İstediğinize Emin Misiniz ?"
              onConfirm={() => {
                deleteArticle(article.id);
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
        navigate(`${adminBaseUrl}/article-add`)
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
              {articals_upper_str}
            </span>
          }
          key="1"
        >
          <div className="site-card-border-less-wrapper">
            <Table 
            bordered size="small" 
            columns={columns} 
            dataSource={articles}
            pagination={pagination}
            onChange={handleChangeTable}
            />
          </div>
        </Tabs.TabPane>
      </Tabs>

      </>)
}
