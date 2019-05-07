<template>
  <div id="scroeList">
    <div class="title_fixed ac">POWER BY SOUKY</div>
  	<div id="tables">
  		<div id="autoCode">

  			<div class="main">
  	            <div class="titleMain ac">
  	                	查看奏折
  	            </div>

  	            <div class="formData clearfix">
  	                <div class="items fl">
  	                    <el-input v-model="query.realName" class="fomatInput" type="text" placeholder="姓名" />
  	                </div>

  	                <div class="items fl">
  	                    <el-input v-model="query.phone" class="fomatInput" type="text" placeholder="手机号" />
  	                </div>

  	                <div class="items fl">
  	                </div>

  	                <div class="items fl clearfix">
  	                	<el-button>查询</el-button>
  	                </div>
  	            </div>

  	            <div class="titleMain ac">
  	                	奏折列表
  	            </div>
  	            <div class="tables">
              		<el-table   :data="tableData"  style="width: 100%" >
  			            <el-table-column align="center" prop="reallyName" label="姓名" ></el-table-column>
  			            <el-table-column align="center" prop="phone" label="手机号" ></el-table-column>
  			            <el-table-column align="center" prop="createDate" label="答题时间" ></el-table-column>
  			            <el-table-column align="center" class-name="operations" label="操作" width="90">
  				            <template slot-scope="scope">
  				             	<div class="op_items">
  			    					<el-button size="mini" @click="show(scope.row.id)">查看</el-button>
  			    				</div>
  				            </template>
  			            </el-table-column>
  	            	</el-table>
  	            </div>
  	            <div class="pages_so">
  	            	<el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page.sync="page.pageNum"
  				      :page-sizes="[10, 20, 30, 40]"
  				      :page-size="page.pageSize"
  				      layout="sizes,prev, pager, next,jumper" :total="page.total">
  				    </el-pagination>
  	            </div>

          	</div>

          	<el-dialog title="查看成绩" :visible.sync="dialogVisible" width="80%" >
    				<div class="answer-body" v-loading="loading">
    					<div id="randar"></div>
    					<div class="table_right">
    						<el-table   :data="tableData"  style="width: 100%" >
  			            <el-table-column align="center" prop="sort" label="题号" ></el-table-column>
  			            <el-table-column align="center" prop="answer" label="标准答案" ></el-table-column>
  			            <el-table-column align="center" prop="userAnswer" label="这货的答案" ></el-table-column>
  			            <el-table-column align="center" prop="time" label="答题时间" ></el-table-column>
  			            <el-table-column align="center" prop="ablity" label="能力属性" ></el-table-column>
  	            	</el-table>
    					</div>
    				</div>

  				<span slot="footer" class="dialog-footer">
  				  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  				</span>
  			</el-dialog>

  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      query:{
  		  reallyName:'',
  		  phone:'',
  	  },
  	  tableData:[],
  	  page:{
      	pageNum:1,
      	pageSize:10,
      	total:1
      },
      dialogVisible:false,
      loading:true,
    }
  },
  mounted:function(){
	this.loadData();
  },
  methods:{
	  loadData(){
		  var data = this.query;
	      data['pageNum'] = this.page.pageNum;
  		  data['pageSize'] = this.page.pageSize;
  		  this.$postHttp("auditionform/queryAuditionForms",data,res=>{
  			  this.tableData = res.result.list;
  			  this.page.pageNum = res.result.pageNum;
  			  this.page.total = res.result.total;
  		  })
	  },
	  formatDate(row,value){

	  },
	  show(id){
		  this.loading = true;
		  this.dialogVisible = true;
		  this.$postHttp("useranswer/getUserAnswerByUserId",id,res=>{
				console.log(res);
				//this.randars(res);

		  })
	  },
	  randars(res){
		  var docs = document.getElementById('randar');
		  var myChart = echarts.init(docs);
		  option = {
			title: {
			     x: 'center',
			    text: '能力值'
			},
			tooltip: {
			    trigger: 'axis'
			},
			radar: [
			    {
			        indicator: [
			            {text: '能力值1', max: 100},
			            {text: '能力值2', max: 100},
			            {text: '能力值3', max: 100},
			            {text: '能力值4', max: 100},
			            {text: '能力值5', max: 100}
			        ],
			        center: ['50%','40%'],
			        radius: 50
			    }
			],
			series: [
			    {
			        type: 'radar',
			         tooltip: {
			            trigger: 'item'
			        },
			        itemStyle: {normal: {areaStyle: {type: 'default'}}},
			        data: [
			            {
			                value: [60,73,85,40,99],
			                name: '某软件'
			                }
			            ]
			        }
			    ]
		  };
		  myChart.setOption(option);
		  this.loading = false;
	  },
	  pageSizeChange(val) {
		  this.page.pageSize = val;
		  this.loadData();
	  },
	  pageChange(val) {
		  this.page.pageNum = val;
		  this.loadData();
	  },
  }
}
</script>

<style>
#tables{
	min-height:300px;
}
body{
	width: 100%;
    background: #fcc;
}

::-webkit-scrollbar{width: 10px;position: absolute;right: 0px;top: 0px;z-index: 9999;}
::-webkit-scrollbar-track{background-color:#E0E0E0;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius:5px;}
::-webkit-scrollbar-thumb{background-color:#868686;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius:5px;}

#autoCode .main{
    width: 98%;
    background: #fff;
    color: #666;
    min-height: 700px;
    margin: 80px auto;
    border-radius: 5px;
}
#autoCode .main .titleMain{
	width: 90%;
	height: 40px;
	line-height: 40px;
	font-size: 20px;
	border-bottom: 1px #c7c7c7 solid;
	margin: auto;
	position: relative;

}

#autoCode .formData{
	width: 90%;
	margin:30px auto;
  display: flex;
	/*padding-bottom: 50px;
	border-bottom: 1px #c7c7c7 solid;*/
}

#autoCode .formData .items{
	width: 21%;
	margin:20px 2% 0px 2%;
}

.answer-body{
	width:95%;
	margin:auto;
	display:flex;
}
.answer-body #randar{
	width:300px;
	height:400px;
}
.answer-body .table_right{
	width:calc(100% - 320px);
	margin-left:20px;
}

#autoCode .formData .fomatInput:focus, textarea:focus, keygen:focus, select:focus {
    outline-offset: 0px;
    border-bottom-color:#ca2450
}
:focus {
    outline: -webkit-focus-ring-color none 0px;
}
</style>
