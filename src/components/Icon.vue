<template>
    <i class="iconfont" :class="iconClass"></i>
  </template>
  
  <script>
  export default {
    name: "Icon",
    props: {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: "class",
      },
    },
    computed: {
      iconClass() {
        if (this.type === "class") {
          return `icon-${this.name}`;
        }
        return "";
      },
    },
  };
  </script>
  