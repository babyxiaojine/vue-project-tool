<template>
    <div class="wrapper official-detail">
        <TargetInfo v-if="datailId" :datailId="datailId" :mapVisible="true" :locationData="locationData"></TargetInfo>
    </div>
</template>

<script type="text/ecmascript-6">
  import TargetInfo from '@/pages/officialTarget/targetInfo'
  export default {
    name: 'TobeSetupDetail',
    data() {
      return {
        datailId: '',
        locationData:{},
      }
    },
    components: {
        TargetInfo
    },
    created() {
      const routeParam = this.$route.params;
      if (routeParam.tid) this.datailId = routeParam.tid;
      if (routeParam.locationData) this.locationData = routeParam.locationData;
    },
    mounted() {

    },
    methods: {
 

    },
    computed: {

    }
  }
</script>
