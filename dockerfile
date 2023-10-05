# 设置基础镜像
FROM nginx
# 维护者信息
MAINTAINER Aleo
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
# 本地配置替换Nginx镜像的配置
COPY nginx.conf /etc/nginx/nginx.conf
#只是声明暴露端口
EXPOSE 2077
# 原神，启动！
CMD ["nginx","-g","daemon off;"]
