<template>
  <div>
    <div id="container" class="container"></div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'standardOverview',
  data() {
    return {
      map: '',
      layer: '',
      pageLoading: '',
      resultsData: '',
      infoWin: '',
      tableDom: '',
    }
  },
  methods: {

    initMap() {
      this.map = Loca.create('container', {
        mapStyle: 'amap://styles/midnight',
        center: [108.149185, 33.663153],
        features: ['bg', 'road'],
        zoom: 4
      });

      this.layer = Loca.visualLayer({
        // 配置 selectStyle 前先开启事件开关，否则无法触发鼠标事件。
        eventSupport: true,
        container: this.map,
        blendMode: 'lighter',
        type: 'line',
        shape: 'line',
        fitView: true
      });

      this.layer.on('mousemove', (ev) => {
        // 事件类型
        console.log('ev', ev);

        const rawData = ev.rawData;

        const routeName = `${rawData.fluid_name}-${rawData.station_name}`;
        const fluidAddress = rawData.fluid_address;
        const stationName = rawData.station_name;
        const originalEvent = ev.originalEvent;

        this.openInfoWin(this.map.getMap(), originalEvent, {
          '路线': routeName,
          '液厂位置': fluidAddress,
          '站点位置': stationName,
        });

      });

      this.layer.on('mouseleave', (ev) => {
        this.closeInfoWin();
      });

      this.layer.setOptions({
        style: {
          lineWidth: 1,
          curveness: 0.2,
          stroke: 'rgba(49, 80, 189, 0.3)'
        },
        // 样式改变条件为 mouseenter 及 mouseleave，没有设置的属性会继承 style 中的配置
        selectStyle: {
          lineWidth: 3,
          stroke: 'rgba(49, 80, 189, 0.8)'
        }
      });

    },
    openInfoWin(map, event, content) {
      if (!this.infoWin) {
        this.infoWin = new AMap.InfoWindow({
          isCustom: true, //使用自定义窗体
          offset: new AMap.Pixel(130, 100)
        });
      }

      var x = event.offsetX;
      var y = event.offsetY;
      var lngLat = map.containerToLngLat(new AMap.Pixel(x, y));

      if (!this.tableDom) {
        let infoDom = document.createElement('div');
        infoDom.className = 'overview-info';
        this.tableDom = document.createElement('table');
        infoDom.appendChild(this.tableDom);
        this.infoWin.setContent(infoDom);
      }

      var trStr = '';
      for (var name in content) {
        var val = content[name];
        trStr +=
          '<tr>' +
          '<td class="label">' + name + '</td>' +
          '<td>&nbsp;</td>' +
          '<td class="content">' + val + '</td>' +
          '</tr>'
      }

      this.tableDom.innerHTML = trStr;
      this.infoWin.open(map, lngLat);
    },

    closeInfoWin() {
      if (this.infoWin) {
        this.infoWin.close();
      }
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.pageLoading = true;
        axios.get(`http://namenode:8080/api/v1/loadAllTrip`).then(results => {
          this.pageLoading = false;
          console.log('results', results);
          this.resultsData = results.data.msg;
          this.resultsData = this.resultsData.map(item => {
            return item.coord;
          })
          resolve(results);
        }).catch(err => {
          this.pageLoading = false;
          reject(err);
        })
      })
    },
    renderLayer() {
      this.layer.setData(this.resultsData, {
        lnglat: 'line'
      });
      this.layer.render();
    }
  },
  created() {
    this.getData().then(() => {
      setTimeout(() => {
        this.initMap();
        this.renderLayer();
      }, 2000)
    });

  }
}

</script>
<style lang="less">
#container {
  width: 100%;
  height: 800px;
}

.overview-info {
  padding: 8px;
  color: #fff;
  font-size: 13px;
  background-color: rgba(20, 20, 20, 0.8);
  tr {
    padding: 2px 0;
  }
}

</style>
