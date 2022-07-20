import { validationResult } from "express-validator";
import customTopicSearchModel from "../../models/customTopicSearchModel/customTopicSearch.Model.js"
import { getByCustomTopics } from "../../services/customTopicSearchServices/customTopicSearch.Service.js"
import { client, index } from "../../config/elasticSearchConnection.js";

// EXPORTS >>
export {
    updateCustomTopic,
    deleteCustomTopic,
    getCustomTopics,
    getCustomTopic,
    createCustomTopic,
    getContentByCustomTopic,
    editCreateCustsomtopic,
    customTopicSearch
};



// ROUTES >>

//route: POST api/customTopicSearch/createcustomtopic
//desc:  creating a custom topic by user id.
// access: PROTECTED 
const createCustomTopic = async (req, res) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
           return res.status(400).json(validationErrors.array()[0]);
        }

        const topicsFields = {};
        topicsFields.selection = {};
        topicsFields.filters = {};

        // check if topic name already exisit in DB 
        if(await customTopicSearchModel.findOne({name:req.body.name, userId: req.user.id})){
            return res.status(400).json({ errorMsg: "Topic name already exist" }) // 400 for bad request
        }

        topicsFields.userId = req.user.id;
        // topicsFields.userId = "622a0c7b24abda1ef66718c7";

        if (req.body.name != undefined) {
            topicsFields.name = req.body.name;
        }

        if (req.body.match_type != undefined) {
            topicsFields.selection.match_type = req.body.match_type;
        }


        if (req.body.sources != undefined) {
            topicsFields.selection.sources = req.body.sources; // ignore for now
        }

        if (req.body.any_keywords != undefined) {
            topicsFields.selection.any_keywords = req.body.any_keywords;
        }


        if (req.body.must_also_keywords != undefined) {
            topicsFields.selection.must_also_keywords = req.body.must_also_keywords;
        }


        if (req.body.must_not_contains_keywords != undefined) {
            topicsFields.selection.must_not_contains_keywords =
                req.body.must_not_contains_keywords;
        }

        if (req.body.include_domains != undefined) {
            topicsFields.selection.include_domains = req.body.include_domains;
        }

        if (req.body.exclude_domains != undefined) {
            topicsFields.selection.exclude_domains = req.body.exclude_domains;
        }

        if (req.body.limit_domains_results != undefined) {
            topicsFields.selection.limit_domains_results =
                req.body.limit_domains_results;
        }

        if (req.body.type != undefined) topicsFields.filters.type = req.body.type; // ignore for now
        if (req.body.sort != undefined) topicsFields.filters.sort = req.body.sort; // ignore for now
        if (req.body.enddate != undefined) topicsFields.filters.enddate = req.body.enddate;
        if (req.body.startdate != undefined) topicsFields.filters.startdate = req.body.startdate;
        if (req.body.language != undefined) topicsFields.filters.language = req.body.language;
        if (req.body.engagement != undefined) topicsFields.filters.engagement = req.body.engagement; // ignore for now


        try {
            const newCustomTopic = new customTopicSearchModel(topicsFields);
            const result = await newCustomTopic.save();
            console.log(result)
            res.status(201).json({ successMsg: "Topic created successfully" });

        } catch (err) {
            res.status(500).json({ errorMsg: "Server Error" });
            console.log("ERROR OCCOURED WHILE CREATING A CUSTOM TOPIC", err);
        }

    } catch (err) {
        return res.status(500).json({ errorMsg: err.message });
        console.log("ERROR OCCOURED WHILE CREATING A CUSTOM TOPIC", err);
    }

};


// route:  GET api/customTopicSearch/getcustomtopic/:id
// desc:   reading a custom topic by topic id.
// access: PROTECTED
const getCustomTopic = async (req, res) => {
    try {
        const customTopic = await customTopicSearchModel.findById(req.params.id);

        if (!customTopic) {
            return res.status(404).json({ errorMsg: "topic not found" });
        }

        return res.status(200).json(customTopic)


    } catch (err) {
        return res.status(500).json({ errorMsg: "Server Error" });
        console.log("ERROR OCCOURED WHILE READING A CUSTOM TOPIC", err);
    }
};








//route:  GET api/customTopicSearch/getcustomtopics
//desc:   reading all custom topics by user id.
//access: PROTECTED
const getCustomTopics = async (req, res) => {

    try {
        const userId = req.user.id;
        // const userId = "622a0c7b24abda1ef66718c7";

        const customTopics = await customTopicSearchModel.find({ userId: userId });

        if (customTopics.length == 0) {
            return res.status(200).json({ InformationMsg: "No custom topics yet" })
        }

        return res.status(200).json(customTopics);

    } catch (err) {
        res.status(500).json({ errorMsg: "Server Error" });
        console.log("ERROR OCCOURED WHILE READING CUSTOM TOPICs", err);
    }

};



//route: DELETE api/customTopicSearch/deletecustomtopic/:id
//desc:  deleting a custom topic by topic id.
//access: PROTECTED
const deleteCustomTopic = async (req, res) => {
    try {
        await customTopicSearchModel.deleteOne({ _id: req.params.id });
        return res.status(200).json({ successMsg: "Topic deleted successfully." });
    } catch (err) {
        return res.status(500).json({ errorMsg: "Server Error" });
        console.log("ERROR OCCOURED WHILE DELETING CUSTOM TOPIC", err);
    }
};



//route: PATCH api/customTopicSearch/updatecustomtopic/:id
//desc:  updating a custom topic by topic id.
//access: PROTECTED
const updateCustomTopic = async (req, res) => {
    try {

        const topicsFields = {};
        topicsFields.selection = {};
        topicsFields.filters = {};

        if (req.body.name != undefined) {
            topicsFields.name = req.body.name;
        }

        if (req.body.match_type)
            topicsFields.selection.match_type = req.body.match_type;
        if (req.body.sources) topicsFields.selection.sources = req.body.sources;

        if (req.body.any_keywords != undefined) {
            topicsFields.selection.any_keywords = req.body.any_keywords;
        }

        if (req.body.must_also_keywords != undefined) {
            topicsFields.selection.must_also_keywords = req.body.must_also_keywords;
        }

        if (req.body.must_not_contains_keywords != undefined) {
            topicsFields.selection.must_not_contains_keywords =
                req.body.must_not_contains_keywords;
        }

        if (req.body.include_domains != undefined) {
            topicsFields.selection.include_domains = req.body.include_domains;
        }

        if (req.body.exclude_domains != undefined) {
            topicsFields.selection.exclude_domains = req.body.exclude_domains;
        }

        if (req.body.limit_domains_results != undefined) {
            topicsFields.selection.limit_domains_results =
                req.body.limit_domains_results;
        }

        if (req.body.type != undefined) topicsFields.filters.type = req.body.type;
        if (req.body.sort != undefined) topicsFields.filters.sort = req.body.sort;
        if (req.body.enddate != undefined) topicsFields.filters.enddate = req.body.enddate;
        if (req.body.startdate != undefined) topicsFields.filters.startdate = req.body.startdate;
        if (req.body.language != undefined) topicsFields.filters.language = req.body.language;
        if (req.body.engagement != undefined) topicsFields.filters.engagement = req.body.engagement;

        try {
            await customTopicSearchModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: topicsFields }
            );
            res.status(200).json({ successMsg: "Edited successfully" });

        } catch (err) {
            res.status(500).json({ errorMsg: "Server Error" });
            console.log("ERROR OCCOURED WHILE UPDATING CUSTOM TOPIC", err);
        }
    } catch (err) {
        return res.status(500).json({ errorMsg: "Server Error" });
        console.log("ERROR OCCOURED WHILE UPDATING CUSTOM TOPIC", err);
    }
};


// route:  /api/customTopicSearch/:id/:offset 
// desc:   reading data from elastic_search by getting query from customTopicsSearch.model by topic id
//access: PROTECTED  
const getContentByCustomTopic = async (req, res) => {
    try {
        const topic = await customTopicSearchModel.findById(req.params.id)
        if (!topic) {
            return res.status(404).json({ errorMsg: "Topic Not Found" });
        }
        const data = await getByCustomTopics(topic, req.params.offset); // elastic search query function
        return res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ errorMsg: "Server Error" });
        console.log(err.message);
        console.log("ERROR OCCOURED WHILE FETCHING DATA FROM ELASTIC SEARCH", err);
    }
};


// route:  POST /api/customTopicSearch/editCreateCustsomtopic/ 
// desc:   
//access: PROTECTED  
const editCreateCustsomtopic = async (req, res) => {
    try {
        const { filterObj } = req.body;
        res.status(200).send(filterObj);
    } catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: "Server Error" + err.message });
    }

};


// route:  POST /api/customTopicSearch/customTopicSearch/ 
// desc:   
//access: PROTECTED  
const customTopicSearch  = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: "Server Error" + err.message });
    }

};



