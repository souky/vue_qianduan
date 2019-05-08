<template>
  <div id="questionList">
    <div class="title_fixed ac">题 目 设 置</div>
  	<div id="tables">
  		<div id="autoCode">

  			<div class="main">

  	            <div class="formData" style="margin-bottom:5px;">
  	                <div class="items ">
  	                    <el-input v-model="query.question" type="text" placeholder="题干" />
  	                </div>

  	                <div class="items ">
                      <el-select v-model="query.ablity" placeholder="请选择能力值">
                        <el-option label="无" value=""></el-option>
                        <el-option v-for="e in ablitys" :label="e" :value="e" :key="e"></el-option>
                      </el-select>
  	                </div>

  	                <div class="items ">
                    	<el-button type="primary" @click="loadData">查询</el-button>
  	                </div>

  	                <div class="items ">
  	                	<el-button type="primary" @click="setScroe">成绩列表</el-button>
  	                </div>
  	            </div>
                <div class="formData" style="margin-top:5px;">
                  <div class="items "></div>
                  <div class="items "></div>
                  <div class="items "></div>
                  <div class="items ">
                    <el-button type="primary" @click="openAdd">新增题目</el-button>
                  </div>
  	            </div>

  	            <div class="tables">
              		<el-table   :data="tableData"  style="width: 100%" >
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <div class="question-item">
                          <div class="items" v-for="e in props.row.questionItems" :key="e.id">
                            {{e.answerKey}}、{{e.answerItem}}
                          </div>
                        </div>
                      </template>
                    </el-table-column>
  			            <el-table-column align="center" prop="sort" label="序号" ></el-table-column>
  			            <el-table-column align="center" prop="question" label="题干" ></el-table-column>
                    <el-table-column align="center" prop="score" label="分数" ></el-table-column>
                    <el-table-column align="center" prop="ablity" label="能力值" ></el-table-column>
  			            <el-table-column align="center" prop="answer" label="正确答案" ></el-table-column>
  			            <el-table-column align="center" class-name="operations" label="操作" width="140">
  				            <template slot-scope="scope">
  				             	<div class="op_items">
      			    					<el-button size="mini" @click="openEdit(scope.row.id)">查看</el-button>
      			    				</div>
                        <div class="op_items">
      			    					<el-button size="mini" @click="deletes(scope.row.id)">删除</el-button>
      			    				</div>
  				            </template>
  			            </el-table-column>
  	            	</el-table>
  	            </div>
          	</div>

  		</div>
  	</div>

    <el-dialog title="新增题目" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="question" label-width="80px" style="width:80%;margin:auto;">
        <el-form-item label="序号">
          <el-input v-model="question.sort"></el-input>
        </el-form-item>
        <el-form-item label="题干">
          <el-input v-model="question.question"></el-input>
        </el-form-item>
        <el-form-item label="分数">
          <el-input v-model="question.score"></el-input>
        </el-form-item>
        <el-form-item label="能力值">
          <el-select v-model="question.ablity" placeholder="请选择能力值">
            <el-option v-for="e in ablitys" :label="e" :value="e" :key="e"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="正确答案">
          <el-input v-model="question.answer"></el-input>
        </el-form-item>
        <div class="question-item">
          <div class="items" v-for="e in question.questionItems" :key="e.sort">
            {{e.answerKey}}、<el-input v-model="e.answerItem"></el-input>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      query:{
  		  question:'',
  		  ablity:'',
  	  },
  	  tableData:[{}],
      dialogVisible:false,

      question:{
        questionItems:[{sort:1,answerItem:'',answerKey:'A'},{sort:2,answerItem:'',answerKey:'B'},{sort:3,answerItem:'',answerKey:'C'},{sort:4,answerItem:'',answerKey:'D'}]
      },
      ablitys:['隐身','飞行','遁地','透视']
    }
  },
  mounted:function(){
	this.loadData();
  },
  methods:{
	  loadData(){
		  var data = this.query;
		  this.$postHttp("questionbank/queryQuestionBanks",data,res=>{
			  this.tableData = res.result;
		  })
	  },
	  openAdd(){
      this.dialogVisible = true;
      this.question = {questionItems:[{sort:1,answerItem:'',answerKey:'A'},{sort:2,answerItem:'',answerKey:'B'},{sort:3,answerItem:'',answerKey:'C'},{sort:4,answerItem:'',answerKey:'D'}]}
	  },
    save(){
      this.$postHttp("questionbank/saveOrUpdate",this.question,res=>{
			  console.log(res);
        this.loadData();
		  })
    },
	  deletes(id){
	  },
    openEdit(id){

    },
	  pageSizeChange(val) {
		  this.page.pageSize = val;
		  this.loadData();
	  },
	  pageChange(val) {
		  this.page.pageNum = val;
		  this.loadData();
	  },
    setScroe(){
      this.$router.push("scroeList")
    }
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

#autoCode .formData{
	width: 90%;
	margin:30px auto;
  display: flex;
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
#questionList .question-item{
  display: flex;
  display: -webkit-flex;
  flex-wrap:wrap;
}
#questionList .question-item .items{
  width:45%;
  margin:5px 2.5%;
  line-height: 40px;
  text-align: center;
  display: flex;
  display: -webkit-flex;

}

</style>
