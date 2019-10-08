const mixins = {
  methods: {
    goback () {
      this.$router.go(-1)
      bus.$store.commit('setTransitionName', 'page-right')
    }
  }
}

export default mixins