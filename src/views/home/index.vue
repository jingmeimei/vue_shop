<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="./heima.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="iscollapse ?'64px' :'200px'">
        <div class="button-toggle" @click='toggleIscollapse'>|||</div>
        <el-menu background-color="#333744" text-col or="#fff" active-text-color="#409eff"
        unique-opened :collapse='iscollapse'
        :collapse-transition="false" router
         :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for='item in menus' :key='item.id'>
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item  :index="'/'+subItem.path" v-for='subItem in item.children' :key='subItem.id'  @click="saveNavState('/' + subItem.path)" >
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data: () => ({
    menus: [],
    iconsObj: {
      '125': 'iconfont icon-users',
      '103': 'iconfont icon-tijikongjian',
      '101': 'iconfont icon-shangpin',
      '102': 'iconfont icon-danju',
      '145': 'iconfont icon-baobiao'

    },
    iscollapse: false,
    activePath: ''

  }),
  created () {
    this.getMenus()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenus () {
      const
        { data: res } =
       await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menus = res.data
      console.log(res)
    },
    toggleIscollapse () {
      this.iscollapse = !this.iscollapse
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang='less' scoped >
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.button-toggle{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
