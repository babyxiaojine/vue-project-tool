<template>
    <div class="wrapper official-detail">
        <TargetInfo v-if="datailId" :datailId="datailId" :mapVisible="showMap"></TargetInfo>
    </div>
</template>



<script type="text/ecmascript-6">
  import TargetInfo from './targetInfo'

  export default {
    name: 'officialDetail',
    data() {
      return {
        datailId: '',
        showMap:false
      }
    },
    components: {
      TargetInfo,
    },
    created() {
      const routeParam = this.$route.params;
      if (routeParam.tid) this.datailId = routeParam.tid;
      if (routeParam.showMap) this.showMap = !!routeParam.tid;
    },
    mounted() {
    },
    methods: {
    }
  }
</script>


