<template>
  <div class="login_container">
    <div class="login-box">
        <div class="avatar-box">
            <img src="./logo.png" alt="">
        </div>
        <el-form :model="login" :rules="loginFormRules" ref="loginRef">
            <el-form-item prop="username">
                <el-input  v-model="login.username" prefix-icon="iconfont icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="login.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="islogin">登录</el-button>
                <el-button type="info" @click="resetLogin">重置</el-button>
            </el-form-item>

        </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      login: {
        username: 'admin',
        password: '123456'
      },
      // 每个表单里面的prop必须跟表单绑定的数据名称一致，才可以获取input里面的值进行校验
      loginFormRules: {
        // 验证用户名是否合法
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        pass: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLogin () {
      // console.log(this);
      this.$refs.loginRef.resetFields()
      this.login.name = this.login.pass = ''
    },
    islogin () {
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return
        const {
          data: { data, meta }
        } = await this.$http.post('login', this.login)
        console.log(data)
        console.log(meta.status)
        console.log(this.login)
        if (meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        sessionStorage.setItem('token', data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang='less' scoped>
.login_container{
    height: 100%;
background: #2b4b6b;
}
.login-box{
    background: white;
    height: 300px;
    width: 450px;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
    .avatar-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.el-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
