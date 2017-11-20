
		
		var learningTree  = function (data, leaf_clicked_callback, leaf_mouse_over_callback, leaf_mouse_exit_callback) {

    var custom_vertical_offset = [
        [[0, 0], [0, 0], [-8, 6], [0, 0], [0, 3], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [3, 0], [0, 0], [0, 0], [-3, 0], [-3, 0], [-1, 0], [-1, 0], [-1.5, 1], [3, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, -2], [0, 4], [-1, 0], [0, 2], [0, -2], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        [[2, 2], [0, 0], [-2, -2], [-4, -4], [0, -3], [0, 0], [0, 0], [0, 0], [-3, -3], [0, 0], [-5, 0], [0, 0]],
        [[2, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    ];

    var branch_angle = [
        [97, 92, 79, 76, 76, 72, 68, 68, 68, 70, 68, 71],
        [84, 94, 102, 108, 112, 114, 114, 114, 114, 114, 114, 114],
        [93, 89, 79, 76, 76, 72, 68, 68, 68, 70, 68, 71],
        [88, 94, 102, 108, 112, 114, 114, 114, 114, 114, 114, 114],
        [97, 92, 83, 76, 79, 68, 68, 68, 68, 70, 68, 71],
        [90, 94, 102, 108, 112, 114, 114, 114, 114, 114, 114, 114],
        [100, 105, 100, 93, 82, 72, 68, 68, 68, 70, 68, 71]
    ];
    var self = this;
    self.treeData = data;
    var tree_width = paper.view.size.width - 20;
    var tree_height = paper.view.size.height;
    var tree_start_x = tree_width / 2;
    var tree_start_y = tree_height - 150;
    var month_position = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    var month_branch;
    var root_color = ["#B82D2D", "#E5A11C", "#91C560", "#2E4A0D", "#2DA2C4", "#282060", "#8566E1"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var months_label = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AIG", "SEp", "OCT", "NOV", "DEC"];
    createRoots();
    var ground = createGround();
    var tree = createTree();
    var branches = createBranches();
    create_month_label();
    create_leaf();
    function get_strand_index(id) {
        for (var index = 0; index < self.treeData.strands.length; index++) {
            if (self.treeData.strands[index].id == id) {
                return index;
                break;
            }
        }
    }

    function get_month_index(month) {
        var months = new Array();
        months["January"] = 0;
        months["February"] = 1;
        months["March"] = 2;
        months["April"] = 3;
        months["May"] = 4;
        months["June"] = 5;
        months["July"] = 6;
        months["August"] = 7;
        months["September"] = 8;
        months["October"] = 9;
        months["November"] = 10;
        months["December"] = 11;

        return months[month];

    }

    function create_new_leaf(leaf_start_x, leaf_start_y, leaf_color, is_left,branch_index) {

        var left_edge, right_edge;
        var scale = 20; //23
        var leaf_height = 500; //
        leaf_height = leaf_height / scale;
        var leaf_direction=branch_index % 2;

        if (is_left == 2) {


            if(leaf_direction==0){
                var leaf_end_x = leaf_start_x + leaf_height;
                var leaf_end_y = leaf_start_y + leaf_height;
                var mid_point_x = leaf_start_x;
                var mid_point_y = leaf_start_y + (leaf_end_y - leaf_start_y) / 2;
                var point1 = new paper.Point(leaf_start_x, leaf_start_y);
                var point4 = new paper.Point(leaf_end_x, leaf_end_y, 1)
                var point2 = new paper.Point((-(leaf_start_x - leaf_end_x) / 4) / scale + (20 / scale), 10 / scale);

                var point3 = new paper.Point(-100 / scale, -60 / scale)

                var curve = new paper.Curve(point1, point2, point3, point4);
                var middle_edge = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
                middle_edge.strokeColor = 'black';
                var middle_edge2 = middle_edge.clone();

                var leaf_bottom = middle_edge.getPointAt(0);
                var leaf_top = middle_edge.getPointAt(middle_edge.length);
                var leaf_top_left = new paper.Point(leaf_top.x - 40, leaf_top.y);
                var leaf_top_right = new paper.Point(leaf_top.x, leaf_top.y - 100);


                var point5 = new paper.Point(leaf_start_x, leaf_start_y);
                var point8 = new paper.Point(leaf_end_x, leaf_end_y, 1);
                var point6 = new paper.Point((-((leaf_start_y - leaf_end_y) / 3) + 60) / scale + (100 / scale), -190 / scale);
                var point7 = new paper.Point(0, -30 / scale)

                var curve_left = new paper.Curve(point5, point6, point7, point8);
                left_edge = new paper.Path({segments: [curve_left.segment1, curve_left.segment2], strokeColor: 'black'});
                left_edge.strokeColor = 'black';
                /**/
                var point9 = new paper.Point(leaf_start_x, leaf_start_y);
                var point12 = new paper.Point(leaf_end_x, leaf_end_y, 1);
                var point10 = new paper.Point(-20 / scale, 300 / scale);
                var point11 = new paper.Point(-120 / scale, -20 / scale)
                var curve_right = new paper.Curve(point9, point10, point11, point12);
                right_edge = new paper.Path({segments: [curve_right.segment1, curve_right.segment2], strokeColor: 'black'});
                right_edge.strokeColor = 'red';
                right_edge.join(middle_edge);
                left_edge.strokeColor = 'red';
                left_edge.join(middle_edge2);
            }else{

                var leaf_end_x = leaf_start_x - leaf_height;
                var leaf_end_y = leaf_start_y + leaf_height;
                var mid_point_x = leaf_start_x;
                var mid_point_y = leaf_start_y + (leaf_end_y - leaf_start_y) / 2;

                var point1 = new paper.Point(leaf_start_x, leaf_start_y);
                var point4 = new paper.Point(leaf_end_x, leaf_end_y, 1)
                var point2 = new paper.Point((-(leaf_start_x - leaf_end_x) / 4) / scale + (20 / scale), 10 / scale);

                var point3 = new paper.Point(-100 / scale, -60 / scale)

                var curve = new paper.Curve(point1, point2, point3, point4);
                var middle_edge = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
                middle_edge.strokeColor = 'black';
                var middle_edge2 = middle_edge.clone();

                var leaf_bottom = middle_edge.getPointAt(0);
                var leaf_top = middle_edge.getPointAt(middle_edge.length);
                var leaf_top_left = new paper.Point(leaf_top.x - 40, leaf_top.y);
                var leaf_top_right = new paper.Point(leaf_top.x, leaf_top.y - 100);


                var point5 = new paper.Point(leaf_start_x, leaf_start_y);
                var point8 = new paper.Point(leaf_end_x, leaf_end_y, 1);
                var point6 = new paper.Point(-300 / scale,-20 / scale); //new paper.Point((-((leaf_start_y - leaf_end_y) / 3) + 60) / scale + (100 / scale), -190 / scale);
                var point7 = new paper.Point(0, -30 / scale)

                var curve_left = new paper.Curve(point5, point6, point7, point8);
                left_edge = new paper.Path({segments: [curve_left.segment1, curve_left.segment2], strokeColor: 'black'});
                left_edge.strokeColor = 'black';
                /**/
                var point9 = new paper.Point(leaf_start_x, leaf_start_y);
                var point12 = new paper.Point(leaf_end_x, leaf_end_y, 1);
                var point10 = new paper.Point(20 / scale, 300 / scale);
                var point11 =new paper.Point(120 / scale, 20 / scale);

                var curve_right = new paper.Curve(point9, point10, point11, point12);
                right_edge = new paper.Path({segments: [curve_right.segment1, curve_right.segment2], strokeColor: 'black'});
                right_edge.strokeColor = 'red';
                right_edge.join(middle_edge);
                left_edge.strokeColor = 'red';
                left_edge.join(middle_edge2);
            }






            var color = {
                gradient: {
                    stops: [leaf_color, new paper.Color(1, 1, 1)]
                },
                origin: leaf_bottom,
                destination: leaf_top
            };

            right_edge.fillColor = leaf_color;
            color = {
                gradient: {
                    stops: [leaf_color, new paper.Color(1, 1, 1)],
                    radial: true
                },
                origin: leaf_bottom,
                destination: leaf_top
            };

            left_edge.fillColor = leaf_color; //color//'blue';
            left_edge.on({
                mouseenter: function (event) {
                },
                mouseleave: function (event) {
                    $("#leaf-label").html("");

                    this.selected = false;
                }
            });

            right_edge.strokeColor = 'white';
            right_edge.on({
                mouseenter: function (event) {
                },
                mouseleave: function (event) {
                    $("#leaf-label").html("");

                    this.selected = false;
                }
            });
            left_edge.strokeColor = 'white';
        }else if (is_left == 3) {

            var reduction = 150 / scale;
            leaf_height = leaf_height - reduction;
            if(leaf_direction==0){
                var leaf_end_x = leaf_start_x + leaf_height;
                var leaf_end_y = leaf_start_y - leaf_height;//-20;
                var mid_point_x = leaf_start_x;
                var mid_point_y = leaf_start_y + (leaf_end_y - leaf_start_y) / 2;

                var point1 = new paper.Point(leaf_start_x, leaf_start_y);
                var point4 = new paper.Point(leaf_end_x, leaf_end_y);
                var point2 = new paper.Point((-(leaf_start_x - leaf_end_x) / 4) / scale, 35 / scale);
                var point3 = new paper.Point(100 / scale, -60 / scale);
                var curve = new paper.Curve(point1, point2, point3, point4);
                var middle_edge = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
                middle_edge.strokeColor = 'black';
                var middle_edge2 = middle_edge.clone();
                var leaf_bottom = middle_edge.getPointAt(0);
                var leaf_top = middle_edge.getPointAt(middle_edge.length);
                var leaf_top_left = new paper.Point(leaf_top.x - 40, leaf_top.y);
                var leaf_top_right = new paper.Point(leaf_top.x, leaf_top.y - 100);

                var point5 = new paper.Point(leaf_start_x, leaf_start_y);
                var point8 = new paper.Point(leaf_end_x, leaf_end_y);
                var point6 = new paper.Point((((leaf_start_y - leaf_end_y) / 3) + 60) / scale - (300 / scale), -190 / scale);
                var point7 = new paper.Point(0, -30 / scale);

                var curve_left = new paper.Curve(point5, point6, point7, point8);
                left_edge = new paper.Path({segments: [curve_left.segment1, curve_left.segment2], strokeColor: 'black'});
                left_edge.strokeColor = 'black';

                var point9 = new paper.Point(leaf_start_x, leaf_start_y);
                var point12 = new paper.Point(leaf_end_x, leaf_end_y);
                var point10 = new paper.Point(-(((leaf_start_y - leaf_end_y) / 3) + 40) / scale + (150 / scale), 270 / scale);//new paper.Point((-((leaf_start_x-leaf_end_x)/3)+40)/scale,-270/scale);
                var point11 = new paper.Point(120 / scale, -20 / scale);

                var curve_right = new paper.Curve(point9, point10, point11, point12);
                right_edge = new paper.Path({segments: [curve_right.segment1, curve_right.segment2], strokeColor: 'black'});
                right_edge.strokeColor = 'red';
                right_edge.join(middle_edge);
                left_edge.strokeColor = 'red';
                left_edge.join(middle_edge2);


                var color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)]
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };

                right_edge.fillColor = leaf_color; // color;
                color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)],
                        radial: true
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };

                left_edge.fillColor = leaf_color; //color;
                // left_edge.shadowColor = new paper.Color(0, 0, 0);
                // left_edge.shadowBlur = 12;
                left_edge.on({
                    mouseenter: function (event) {

                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                //right_edge.shadowOffset = new paper.Point(5, 5);
                right_edge.strokeColor = 'white';
                right_edge.on({
                    mouseenter: function (event) {
                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                left_edge.strokeColor = 'white';
            }else{
                var leaf_end_x = leaf_start_x - leaf_height;
                var leaf_end_y = leaf_start_y - leaf_height;//-20;
                var mid_point_x = leaf_start_x;
                var mid_point_y = leaf_start_y + (leaf_end_y - leaf_start_y) / 2;

                var point1 = new paper.Point(leaf_start_x, leaf_start_y);
                var point4 = new paper.Point(leaf_end_x, leaf_end_y);
                var point2 = new paper.Point((-(leaf_start_x - leaf_end_x) / 4) / scale, 35 / scale);
                var point3 = new paper.Point(100 / scale, -60 / scale);
                var curve = new paper.Curve(point1, point2, point3, point4);
                var middle_edge = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
                middle_edge.strokeColor = 'black';
                var middle_edge2 = middle_edge.clone();
                var leaf_bottom = middle_edge.getPointAt(0);
                var leaf_top = middle_edge.getPointAt(middle_edge.length);
                var leaf_top_left = new paper.Point(leaf_top.x - 40, leaf_top.y);
                var leaf_top_right = new paper.Point(leaf_top.x, leaf_top.y - 100);

                var point5 = new paper.Point(leaf_start_x, leaf_start_y);
                var point8 = new paper.Point(leaf_end_x, leaf_end_y);
                var point6 = new paper.Point(-10,10); //new paper.Point((((leaf_start_y - leaf_end_y) / 3) + 60) / scale - (300 / scale), -190 / scale);
                var point7 = new paper.Point(0, -30 / scale);

                var curve_left = new paper.Curve(point5, point6, point7, point8);
                left_edge = new paper.Path({segments: [curve_left.segment1, curve_left.segment2], strokeColor: 'black'});
                left_edge.strokeColor = 'black';

                var point9 = new paper.Point(leaf_start_x, leaf_start_y);
                var point12 = new paper.Point(leaf_end_x, leaf_end_y);
                var point10 =new paper.Point(10,-10); //new paper.Point(-(((leaf_start_y - leaf_end_y) / 3) + 40) / scale + (150 / scale), 270 / scale);//new paper.Point((-((leaf_start_x-leaf_end_x)/3)+40)/scale,-270/scale);
                var point11 = new paper.Point(120 / scale, -20 / scale);

                var curve_right = new paper.Curve(point9, point10, point11, point12);
                right_edge = new paper.Path({segments: [curve_right.segment1, curve_right.segment2], strokeColor: 'black'});
                right_edge.strokeColor = 'red';
                right_edge.join(middle_edge);
                left_edge.strokeColor = 'red';
                left_edge.join(middle_edge2);


                var color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)]
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };

                right_edge.fillColor = leaf_color; // color;
                color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)],
                        radial: true
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };

                left_edge.fillColor = leaf_color; //color;
                // left_edge.shadowColor = new paper.Color(0, 0, 0);
                // left_edge.shadowBlur = 12;
                left_edge.on({
                    mouseenter: function (event) {

                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                //right_edge.shadowOffset = new paper.Point(5, 5);
                right_edge.strokeColor = 'white';
                right_edge.on({
                    mouseenter: function (event) {
                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                left_edge.strokeColor = 'white';
            }


        } else if (is_left == 1) {
            if(leaf_direction==0){
                var leaf_end_x =leaf_start_x - leaf_height+scale/2;

                var leaf_end_y =leaf_start_y-scale;

                var mid_point_x = leaf_start_x;
                var mid_point_y = leaf_start_y + (leaf_end_y - leaf_start_y) / 2;

                var point1 = new paper.Point(leaf_start_x, leaf_start_y);
                var point4 = new paper.Point(leaf_end_x, leaf_end_y);
                //var point2 = new paper.Point((-(leaf_start_x - leaf_end_x) / 4) / scale, 35 / scale);
                var point2 = new paper.Point((-(leaf_start_x - leaf_end_x) / 4), 35 / scale);
                var point3 = new paper.Point(200 / scale, -100 / scale);
                // var point3 = new paper.Point(100 / scale, -60 / scale);

                var curve = new paper.Curve(point1, point2, point3, point4);
                var middle_edge = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
                middle_edge.strokeColor = 'black';
                var middle_edge2 = middle_edge.clone();

                var leaf_bottom = middle_edge.getPointAt(0);
                var leaf_top = middle_edge.getPointAt(middle_edge.length);
                var leaf_top_left = new paper.Point(leaf_top.x - 40, leaf_top.y);
                var leaf_top_right = new paper.Point(leaf_top.x, leaf_top.y - 100);

                var point5 = new paper.Point(leaf_start_x, leaf_start_y);
                var point8 = new paper.Point(leaf_end_x, leaf_end_y);

               // var point6 = new paper.Point((((leaf_start_y - leaf_end_y) / 3) + 60) / scale, -190 / scale);
                var point6 = new paper.Point((((leaf_start_y - leaf_end_y) / 3) + 200) / scale, -190 / scale);
                //var point7 = new paper.Point(0, -30 / scale);
                var point7 = new paper.Point(10, -30 / scale);

                var curve_left = new paper.Curve(point5, point6, point7, point8);
                left_edge = new paper.Path({segments: [curve_left.segment1, curve_left.segment2], strokeColor: 'black'});
                left_edge.strokeColor = 'black';

                var point9 = new paper.Point(leaf_start_x, leaf_start_y);
                var point12 = new paper.Point(leaf_end_x, leaf_end_y);
                //var point10 = new paper.Point(-(((leaf_start_y - leaf_end_y) / 3) + 40) / scale, 270 / scale);
                //var point11 =  new paper.Point(120 / scale, -20 / scale);
                var point10 = new paper.Point(-(((leaf_start_y - leaf_end_y) / 3) + 300)/scale, 270 / scale);
                var point11 =  new paper.Point(200 / scale, -60 / scale);
                var curve_right = new paper.Curve(point9, point10, point11, point12);
                right_edge = new paper.Path({segments: [curve_right.segment1, curve_right.segment2], strokeColor: 'black'});
                right_edge.strokeColor = 'red';
                right_edge.join(middle_edge);
                left_edge.strokeColor = 'red';
                left_edge.join(middle_edge2);


                var color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)]
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };

                right_edge.fillColor = leaf_color; //color;
                color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)],
                        radial: true
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };

                left_edge.fillColor = leaf_color; //color;
                //left_edge.shadowColor = new paper.Color(0, 0, 0);
                //left_edge.shadowBlur = 12;
                left_edge.on({
                    mouseenter: function (event) {
                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                //right_edge.shadowOffset = new paper.Point(5, 5);
                right_edge.strokeColor = 'white';
                right_edge.on({
                    mouseenter: function (event) {
                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                left_edge.strokeColor = 'white';
            }else{
                var leaf_end_x = leaf_start_x - leaf_height;
                var leaf_end_y = leaf_start_y;//-20;
                var mid_point_x = leaf_start_x;
                var mid_point_y = leaf_start_y + (leaf_end_y - leaf_start_y) / 2;

                var point1 = new paper.Point(leaf_start_x, leaf_start_y);
                var point4 = new paper.Point(leaf_end_x, leaf_end_y);
                var point2 = new paper.Point((-(leaf_start_x - leaf_end_x) / 4) / scale, 35 / scale);
                var point3 = new paper.Point(100 / scale, -60 / scale);

                var curve = new paper.Curve(point1, point2, point3, point4);
                var middle_edge = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
                middle_edge.strokeColor = 'black';
                var middle_edge2 = middle_edge.clone();

                var leaf_bottom = middle_edge.getPointAt(0);
                var leaf_top = middle_edge.getPointAt(middle_edge.length);
                var leaf_top_left = new paper.Point(leaf_top.x - 40, leaf_top.y);
                var leaf_top_right = new paper.Point(leaf_top.x, leaf_top.y - 100);

                var point5 = new paper.Point(leaf_start_x, leaf_start_y);
                var point8 = new paper.Point(leaf_end_x, leaf_end_y);
                var point6 = new paper.Point((((leaf_start_y - leaf_end_y) / 3) + 60) / scale, -190 / scale);
                var point7 = new paper.Point(0, -30 / scale);


                var curve_left = new paper.Curve(point5, point6, point7, point8);
                left_edge = new paper.Path({segments: [curve_left.segment1, curve_left.segment2], strokeColor: 'black'});
                left_edge.strokeColor = 'black';
                /**/

                var point9 = new paper.Point(leaf_start_x, leaf_start_y);
                var point12 = new paper.Point(leaf_end_x, leaf_end_y);
                var point10 = new paper.Point(-(((leaf_start_y - leaf_end_y) / 3) + 40) / scale, 270 / scale);//new paper.Point((-((leaf_start_x-leaf_end_x)/3)+40)/scale,-270/scale);
                var point11 = new paper.Point(120 / scale, -20 / scale);

                var curve_right = new paper.Curve(point9, point10, point11, point12);
                right_edge = new paper.Path({segments: [curve_right.segment1, curve_right.segment2], strokeColor: 'black'});
                right_edge.strokeColor = 'red';
                right_edge.join(middle_edge);
                left_edge.strokeColor = 'red';
                left_edge.join(middle_edge2);


                var color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)]
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };

                right_edge.fillColor = leaf_color; //color;
                color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)],
                        radial: true
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };

                left_edge.fillColor = leaf_color; //color;
                //left_edge.shadowColor = new paper.Color(0, 0, 0);
                //left_edge.shadowBlur = 12;
                left_edge.on({
                    mouseenter: function (event) {
                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                //right_edge.shadowOffset = new paper.Point(5, 5);
                right_edge.strokeColor = 'white';
                right_edge.on({
                    mouseenter: function (event) {
                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                left_edge.strokeColor = 'white';
            }

        } else {
            if(leaf_direction==0){
                var leaf_end_x = leaf_start_x + leaf_height;
                var leaf_end_y = leaf_start_y;
                var mid_point_x = leaf_start_x;
                var mid_point_y = leaf_start_y + (leaf_end_y - leaf_start_y) / 2;
                var point1 = new paper.Point(leaf_start_x, leaf_start_y);
                var point4 = new paper.Point(leaf_end_x, leaf_end_y, 1)
                var point2 = new paper.Point((-(leaf_start_x - leaf_end_x) / 4) / scale, 35 / scale);

                var point3 = new paper.Point(-100 / scale, -60 / scale)

                var curve = new paper.Curve(point1, point2, point3, point4);
                var middle_edge = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
                middle_edge.strokeColor = 'black';
                var middle_edge2 = middle_edge.clone();

                var leaf_bottom = middle_edge.getPointAt(0);
                var leaf_top = middle_edge.getPointAt(middle_edge.length);
                var leaf_top_left = new paper.Point(leaf_top.x - 40, leaf_top.y);
                var leaf_top_right = new paper.Point(leaf_top.x, leaf_top.y - 100);

                var point5 = new paper.Point(leaf_start_x, leaf_start_y);
                var point8 = new paper.Point(leaf_end_x, leaf_end_y, 1);
                var point6 = new paper.Point((-((leaf_start_y - leaf_end_y) / 3) + 60) / scale, -190 / scale);
                var point7 = new paper.Point(0, -30 / scale)

                var curve_left = new paper.Curve(point5, point6, point7, point8);
                left_edge = new paper.Path({segments: [curve_left.segment1, curve_left.segment2], strokeColor: 'black'});
                left_edge.strokeColor = 'black';
                /**/

                var point9 = new paper.Point(leaf_start_x, leaf_start_y);
                var point12 = new paper.Point(leaf_end_x, leaf_end_y, 1);
                var point10 = new paper.Point((-((leaf_start_y - leaf_end_y) / 3) + 40) / scale, 270 / scale);
                var point11 = new paper.Point(-120 / scale, -20 / scale)

                var curve_right = new paper.Curve(point9, point10, point11, point12);
                right_edge = new paper.Path({segments: [curve_right.segment1, curve_right.segment2], strokeColor: 'black'});
                right_edge.strokeColor = 'red';
                right_edge.join(middle_edge);
                left_edge.strokeColor = 'red';
                left_edge.join(middle_edge2);


                var color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)]
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };

                right_edge.fillColor = leaf_color; // color;
                color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)],
                        radial: true
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };
                left_edge.fillColor = leaf_color; //color//'blue';
                // left_edge.shadowColor = new paper.Color(0, 0, 0);
                // left_edge.shadowBlur = 12;
                left_edge.on({
                    mouseenter: function (event) {
                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                // right_edge.shadowOffset = new paper.Point(5, 5);
                right_edge.strokeColor = 'white';
                right_edge.on({
                    mouseenter: function (event) {
                        //console.log("705");
                        //console.log(this.data);

                        //this.selected = true;
                        //console.log("show data");

                        //$("#leaf-label").html("<b>Strand:</b>"+this.data.strandName+"<b>Outcome:</b>"+this.data.outcomeText);
                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                left_edge.strokeColor = 'white';
            }else{
                var leaf_end_x =leaf_start_x -leaf_height+scale;

                var leaf_end_y =leaf_start_y-leaf_height;

                var mid_point_x = leaf_start_x;
                var mid_point_y = leaf_start_y + (leaf_end_y - leaf_start_y) / 2;

                var point1 = new paper.Point(leaf_start_x, leaf_start_y);
                var point4 = new paper.Point(leaf_end_x, leaf_end_y);
                //var point2 = new paper.Point((-(leaf_start_x - leaf_end_x) / 4) / scale, 35 / scale);
                var point2 = new paper.Point((-(leaf_start_x - leaf_end_x) / 4), 35 / scale);
                var point3 = new paper.Point(200 / scale, -100 / scale);
                // var point3 = new paper.Point(100 / scale, -60 / scale);

                var curve = new paper.Curve(point1, point2, point3, point4);
                var middle_edge = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
                middle_edge.strokeColor = 'black';
                var middle_edge2 = middle_edge.clone();

                var leaf_bottom = middle_edge.getPointAt(0);
                var leaf_top = middle_edge.getPointAt(middle_edge.length);
                var leaf_top_left = new paper.Point(leaf_top.x - 40, leaf_top.y);
                var leaf_top_right = new paper.Point(leaf_top.x, leaf_top.y - 100);

                var point5 = new paper.Point(leaf_start_x, leaf_start_y);
                var point8 = new paper.Point(leaf_end_x, leaf_end_y);

               // var point6 = new paper.Point((((leaf_start_y - leaf_end_y) / 3) + 60) / scale, -190 / scale);
                var point6 = new paper.Point((((leaf_start_y - leaf_end_y) / 3) + 200) / scale, -190 / scale);
                //var point7 = new paper.Point(0, -30 / scale);
                var point7 = new paper.Point(10, -30 / scale);

                var curve_left = new paper.Curve(point5, point6, point7, point8);
                left_edge = new paper.Path({segments: [curve_left.segment1, curve_left.segment2], strokeColor: 'black'});
                left_edge.strokeColor = 'black';

                var point9 = new paper.Point(leaf_start_x+5, leaf_start_y-5);
                var point12 = new paper.Point(leaf_end_x, leaf_end_y);
                //var point10 = new paper.Point(-(((leaf_start_y - leaf_end_y) / 3) + 40) / scale, 270 / scale);
                //var point11 =  new paper.Point(120 / scale, -20 / scale);
                var point10 = new paper.Point(-(((leaf_start_y - leaf_end_y) / 3) + 500)/scale, 270 / scale);
                var point11 =  new paper.Point(200 / scale, -60 / scale);
                var curve_right = new paper.Curve(point9, point10, point11, point12);
                right_edge = new paper.Path({segments: [curve_right.segment1, curve_right.segment2], strokeColor: 'black'});
                right_edge.strokeColor = 'red';
                right_edge.join(middle_edge);
                left_edge.strokeColor = 'red';
                left_edge.join(middle_edge2);


                var color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)]
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };

                right_edge.fillColor = leaf_color; //color;
                color = {
                    gradient: {
                        stops: [leaf_color, new paper.Color(1, 1, 1)],
                        radial: true
                    },
                    origin: leaf_bottom,
                    destination: leaf_top
                };

                left_edge.fillColor = leaf_color; //color;
                //left_edge.shadowColor = new paper.Color(0, 0, 0);
                //left_edge.shadowBlur = 12;
                left_edge.on({
                    mouseenter: function (event) {
                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                //right_edge.shadowOffset = new paper.Point(5, 5);
                right_edge.strokeColor = 'white';
                right_edge.on({
                    mouseenter: function (event) {
                    },
                    mouseleave: function (event) {
                        $("#leaf-label").html("");

                        this.selected = false;
                    }
                });
                left_edge.strokeColor = 'white';
    
            }


        }



        var temp_leaf = {left: left_edge, right: right_edge}

        return temp_leaf;

    }

    function createSubBranch(x, y, branch_index, month_index) {
        var branch_offset_x = [1, -1];
        var end_x = [40  ,-30];
        var start_point = new paper.Point(x, y);
        var del_y = [-100, -100];
        var direction = (branch_index) % 2;
        end_point = new paper.Point(start_point.x+end_x[direction], start_point.y +del_y[direction]);
        var point2 = new paper.Point(-5, -5);
       // var point2 = new paper.Point(0, 0);
        var point3 = new paper.Point(0, 0)
        if (direction == 1) {
            //point2 = new paper.Point(0, 0);
            point2 = new paper.Point(5, -5);
            end_point.y = end_point.y + 40;
        } else {
            end_point.x = end_point.x - 20;
            end_point.y = end_point.y + 40;
        }
        var curve = new paper.Curve(start_point, point2, point3, end_point);
        var path1 = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
        path1.strokeColor = 'black'
        path1.strokeWidth = 2;
        return path1;

    }
    

    function create_leaf() {
        var total_leaf = 0;
        var incrmt = 1;
        var leaf_counter=0;
        for (var strand_id in self.treeData.outCome) {
            if (self.treeData.outCome.hasOwnProperty(strand_id)) {

                var branch_index = get_strand_index(strand_id);
                var month_outcome = self.treeData.outCome[strand_id];
                var month_story = self.treeData.stories[strand_id];

                for (var month in month_outcome) {
                  if (month_outcome.hasOwnProperty(month)) {
                        var month_index = get_month_index(month);
                        var year_outcome = month_outcome[month];
                        var year_story = month_story[month];
                       
                        for (var year in year_outcome) {
                            if (year_outcome.hasOwnProperty(year)) {

                                var each_year = year_outcome[year];
                                var each_year_story = year_story[year];

                                var outcomes=(each_year.length > 5) ? 5 : each_year.length ;
                                var sub_branch_leaf_index=10;

                                for (var outcome_index = 0; outcome_index < outcomes; outcome_index++) {
                                    var leaf2;

                                    if (outcome_index == 0 && outcomes <= 2) {

                                        var month_path = month_branch [branch_index].month_branch[month_index];
                                        var end_point = month_path.getPointAt(month_path.length);
                                        var stem_point = end_point.clone();
                                        var stem = new paper.Path({
                                            strokeColor: 'black'
                                        });
                                        stem.add(stem_point);
                                        stem.add(new paper.Point(stem_point.x, stem_point.y + 2));
                                        var leaf_point = new paper.Point(stem_point.x, stem_point.y + 2);
                                        leaf2 = create_new_leaf(stem_point.x, stem_point.y, root_color[branch_index], 2,branch_index);
                                        leaf2.left.data = {
                                            "story_id": each_year_story[outcome_index].id,
                                            "story_title": each_year_story[outcome_index].title,
                                            "story_details": each_year_story[outcome_index].details,
                                            "outcome_id": each_year[outcome_index].id,
                                            "outcomeText": each_year[outcome_index].outcomeText,
                                            "strand_id": self.treeData.strands[branch_index].id,
                                            "strandName": self.treeData.strands[branch_index].name
                                        };
                                        leaf2.right.data = {
                                            "story_id": each_year_story[outcome_index].id,
                                            "story_title": each_year_story[outcome_index].title,
                                            "story_details": each_year_story[outcome_index].details,
                                            "outcome_id": each_year[outcome_index].id,
                                            "outcomeText": each_year[outcome_index].outcomeText,
                                            "strand_id": self.treeData.strands[branch_index].id,
                                            "strandName": self.treeData.strands[branch_index].name
                                        };

                                        leaf2.left.on({
                                            mouseenter: function (event) {
                                                leaf_mouse_over_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText)
                                            },
                                            mouseleave: function (event) {
                                                this.selected = false;
                                                leaf_mouse_exit_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                            }
                                        });
                                        leaf2.right.on({
                                            mouseenter: function (event) {
                                                leaf_mouse_over_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                            },
                                            mouseleave: function (event) {
                                                this.selected = false;
                                                leaf_mouse_exit_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                            }
                                        });
                                        leaf2.left.onClick = function (event) {

                                            leaf_clicked_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                        }
                                        leaf2.right.onClick = function (event) {

                                            leaf_clicked_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                        }
                                        //leaf_counter++;
                                    } else if (outcome_index == 1 && outcomes<=2) {
                                        var month_path = month_branch [branch_index].month_branch[month_index];
                                        var end_point = month_path.getPointAt(month_path.length);
                                        var stem_point = end_point.clone();
                                        var stem = new paper.Path({
                                            strokeColor: 'black'
                                        });
                                        stem.add(stem_point);
                                        stem.add(new paper.Point(stem_point.x - 2, stem_point.y + 2));
                                        var leaf_point = new paper.Point(stem_point.x - 2, stem_point.y + 2); // stem.getPointAt(stem.length);
                                        leaf2 = create_new_leaf(stem_point.x, stem_point.y, root_color[branch_index], 3,branch_index);
                                        leaf2.left.data = {
                                            "story_id": each_year_story[outcome_index].id,
                                            "story_title": each_year_story[outcome_index].title,
                                            "story_details": each_year_story[outcome_index].details,
                                            "outcome_id": each_year[outcome_index].id,
                                            "outcomeText": each_year[outcome_index].outcomeText,
                                            "strand_id": self.treeData.strands[branch_index].id,
                                            "strandName": self.treeData.strands[branch_index].name
                                        };
                                        leaf2.right.data = {
                                            "story_id": each_year_story[outcome_index].id,
                                            "story_title": each_year_story[outcome_index].title,
                                            "story_details": each_year_story[outcome_index].details,
                                            "outcome_id": each_year[outcome_index].id,
                                            "outcomeText": each_year[outcome_index].outcomeText,
                                            "strand_id": self.treeData.strands[branch_index].id,
                                            "strandName": self.treeData.strands[branch_index].name
                                        };

                                        leaf2.left.on({
                                            mouseenter: function (event) {
                                                leaf_mouse_over_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);

                                            },
                                            mouseleave: function (event) {
                                                this.selected = false;
                                                leaf_mouse_exit_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                            }
                                        });
                                        leaf2.right.on({
                                            mouseenter: function (event) {
                                                leaf_mouse_over_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                            },
                                            mouseleave: function (event) {

                                                this.selected = false;
                                                leaf_mouse_exit_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                            }
                                        });
                                        leaf2.left.onClick = function (event) {
                                            leaf_clicked_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText)
                                        }
                                        leaf2.right.onClick = function (event) {
                                            leaf_clicked_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText)
                                        }

                                    } else {

                                        var offsetx = [3, -3];
                                        var tempoffsetx = offsetx[branch_index % 2];
                                        var month_path = month_branch [branch_index].month_branch[month_index];
                                        var end_point = month_path.getPointAt(month_path.length);
                                        var this_month_position = month_position[month_index]
                                        var angle = branch_angle[branch_index][this_month_position]
                                        var new_x = end_point.x + (10 * Math.cos((angle * Math.PI) / 180));
                                        var new_y = (end_point.y - custom_vertical_offset[branch_index][this_month_position][total_leaf % 2]) + (10 * Math.sin((angle * Math.PI) / 180))-10;
                                         //month_branch [branch_index].month_branch[month_index].add(new paper.Point(new_x, new_y));
                                       
                                        if(month_branch[branch_index]['sub_branch'] && month_branch[branch_index]['sub_branch'][month_index]){
                                            if(!month_branch[branch_index]['sub_branch'][month_index][this_month_position]){
                                                var sub_branch=createSubBranch(new_x,new_y,branch_index,month_index);
                                                month_branch[branch_index]['sub_branch'][month_index][this_month_position]=sub_branch;
                                            }


                                        }else{

                                            var sub_branch=createSubBranch(new_x,new_y,branch_index,month_index);
                                            month_branch[branch_index]['sub_branch']=[];
                                            month_branch[branch_index]['sub_branch'][month_index]=[];
                                            month_branch[branch_index]['sub_branch'][month_index][this_month_position]=sub_branch;

                                            //sub_branch_leaf_index=sub_branch_leaf_index+5;
                                        }
                                         var sub_branch_path= month_branch[branch_index]['sub_branch'][month_index][this_month_position];
                                        
                                        if (total_leaf % 2 == 0) {
                                           
                                            var point_index= (total_leaf+sub_branch_leaf_index > sub_branch_path.length) ? sub_branch_path.length: total_leaf+sub_branch_leaf_index;
                                            
                                            
                                            var stem_point = sub_branch_path.getPointAt(sub_branch_leaf_index);
                                            //sub_branch_leaf_index=sub_branch_leaf_index+20;
                                            var leaf_point = new paper.Point(stem_point.x, stem_point.y);
                                            leaf2 = create_new_leaf(leaf_point.x, leaf_point.y, root_color[branch_index], total_leaf % 2,branch_index);

                                            leaf2.left.data = {
                                                "story_id": each_year_story[outcome_index].id,
                                                "story_title": each_year_story[outcome_index].title,
                                                "story_details": each_year_story[outcome_index].details,
                                                "outcome_id": each_year[outcome_index].id,
                                                "outcomeText": each_year[outcome_index].outcomeText,
                                                "strand_id": self.treeData.strands[branch_index].id,
                                                "strandName": self.treeData.strands[branch_index].name
                                            };
                                            leaf2.right.data = {
                                                "story_id": each_year_story[outcome_index].id,
                                                "story_title": each_year_story[outcome_index].title,
                                                "story_details": each_year_story[outcome_index].details,
                                                "outcome_id": each_year[outcome_index].id,
                                                "outcomeText": each_year[outcome_index].outcomeText,
                                                "strand_id": self.treeData.strands[branch_index].id,
                                                "strandName": self.treeData.strands[branch_index].name
                                            };
                                            leaf2.left.on({
                                                mouseenter: function (event) {
                                                    leaf_mouse_over_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);

                                                },
                                                mouseleave: function (event) {
                                                    this.selected = false;
                                                    leaf_mouse_exit_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                                }
                                            });
                                            leaf2.right.on({
                                                mouseenter: function (event) {
                                                    leaf_mouse_over_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);

                                                },
                                                mouseleave: function (event) {
                                                    this.selected = false;
                                                    leaf_mouse_exit_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                                }
                                            });
                                            leaf2.left.onClick = function (event) {
                                                leaf_clicked_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                            }
                                            leaf2.right.onClick = function (event) {
                                                leaf_clicked_callback(this.data.story_id, this.data.story_title, this.data.story_detail, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                            }


                                        } else {
                                           
                                            var stem_point = sub_branch_path.getPointAt(sub_branch_leaf_index);
                                            var leaf_point = new paper.Point(stem_point.x, stem_point.y);
                                            sub_branch_leaf_index=sub_branch_leaf_index+sub_branch_path.length/3;
                                            leaf2 = create_new_leaf(leaf_point.x, leaf_point.y, root_color[branch_index], total_leaf % 2,branch_index);

                                            leaf2.left.data = {
                                                "story_id": each_year_story[outcome_index].id,
                                                "story_title": each_year_story[outcome_index].title,
                                                "story_details": each_year_story[outcome_index].details,
                                                "outcome_id": each_year[outcome_index].id,
                                                "outcomeText": each_year[outcome_index].outcomeText,
                                                "strand_id": self.treeData.strands[branch_index].id,
                                                "strandName": self.treeData.strands[branch_index].name
                                            };
                                            leaf2.right.data = {
                                                "story_id": each_year_story[outcome_index].id,
                                                "story_title": each_year_story[outcome_index].title,
                                                "story_details": each_year_story[outcome_index].details,
                                                "outcome_id": each_year[outcome_index].id,
                                                "outcomeText": each_year[outcome_index].outcomeText,
                                                "strand_id": self.treeData.strands[branch_index].id,
                                                "strandName": self.treeData.strands[branch_index].name
                                            };

                                            leaf2.left.on({
                                                mouseenter: function (event) {
                                                    leaf_mouse_over_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);

                                                },
                                                mouseleave: function (event) {

                                                    this.selected = false;
                                                    leaf_mouse_exit_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                                }
                                            });
                                            leaf2.right.on({
                                                mouseenter: function (event) {
                                                    leaf_mouse_over_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                                },
                                                mouseleave: function (event) {

                                                    this.selected = false;
                                                    leaf_mouse_exit_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                                }
                                            });
                                            leaf2.left.onClick = function (event) {
                                                leaf_clicked_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                            }
                                            leaf2.right.onClick = function (event) {

                                                leaf_clicked_callback(this.data.story_id, this.data.story_title, this.data.story_details, this.data.strand_id, this.data.strandName, this.data.outcome_id, this.data.outcomeText);
                                            }

                                        }
                                    }

                                    total_leaf++;
                                }


                            }

                        }

                    }
                }
                //break;
            }
        }

    }


    function create_leaf_shape(leaf_start_x, leaf_start_y, leaf_end_x, leaf_end_y, color, left) {

        if (left == 1) {
            var width = 12;
            var length = 15;
            var upper_mid_point_x = leaf_start_x + (length / 2);
            var upper_mid_point_y = leaf_start_y - (width / 2)
            upper_mid_point_x = upper_mid_point_x + 1
            upper_mid_point_y = upper_mid_point_y + 2

            var lower_mid_point_x = leaf_start_x + (length / 2);
            var lower_mid_point_y = leaf_start_y + (width / 2)
            lower_mid_point_y = lower_mid_point_y + 1

            var path = new paper.Path({
                strokeColor: color
            });

            path.add(new paper.Point(leaf_start_x, leaf_start_y));

            // Add a segment with handles:

            var point = new paper.Point(upper_mid_point_x, upper_mid_point_y);
            var handleIn = new paper.Point(-5.0, 1.0);
            var handleOut = new paper.Point(7.5, 1.5);
            var added = path.add(new paper.Segment(point, handleIn, handleOut));

            // Select the added segment, so we can see its handles:
            //added.selected = true;

            path.add(new paper.Point(leaf_endx, leaf_end_y))
            var abc = new paper.Path({
                strokeColor: 'black'
            });
            abc.add(new paper.Point(leaf_start_x, leaf_start_y));

            // Add a segment with handles:
            var point = new paper.Point(lower_mid_point_x, lower_mid_point_y);
            var handleIn = new paper.Point(-5.0, -1.0);
            var handleOut = new paper.Point(7.5, 0);
            added2 = abc.add(new paper.Segment(point, handleIn, handleOut));

            // Select the added segment, so 5we can see its handles:
            //added2.selected = true;

            abc.add(new paper.Point(leaf_end_x, leaf_end_y))
            path.join(abc);
            path.closed = true;
            path.fillColor = color;
            return path;


        }


        var width = 12;
        var length = 15;


        var upper_mid_point_x = leaf_start_x + (length / 2);
        var upper_mid_point_y = leaf_start_y - (width / 2)

        var lower_mid_point_x = leaf_start_x + (length / 2);
        var lower_mid_point_y = leaf_start_y + (width / 2)

        var path = new paper.Path({
            strokeColor: color
        });

        //console.log(new paper.Point(leaf_start_x, leaf_start_y));
        //console.log(new paper.Point(leaf_end_x, leaf_end_y));
        path.add(new paper.Point(leaf_start_x, leaf_start_y));


        var point = new paper.Point(upper_mid_point_x, upper_mid_point_y);
        var handleIn = new paper.Point(-7.5, 0);
        var handleOut = new paper.Point(5.0, 1.0);
        var added = path.add(new paper.Segment(point, handleIn, handleOut));


        added.selected = false;

        path.add(new paper.Point(leaf_end_x, leaf_end_y))

        var abc = new paper.Path({
            strokeColor: color
        });

        abc.add(new paper.Point(leaf_start_x, leaf_start_y));


        var point = new paper.Point(lower_mid_point_x, lower_mid_point_y);
        var handleIn = new paper.Point(-7.5, 0);
        var handleOut = new paper.Point(5.0, -1.0);
        added = abc.add(new paper.Segment(point, handleIn, handleOut));


        abc.add(new paper.Point(leaf_end_x, leaf_end_y))
        path.join(abc);
        path.closed = true;
        path.fillColor = color;
        return path;
    }


    function create_label(start_point, label, left, top) {

        var path = new paper.Path({
            strokeColor: 'black',
            strokeWidth: 1

        });
        path.add(new paper.Point(start_point.x, start_point.y + 3));
        path.add(start_point);

        return path;

    }

    var student_birth_month = 21;

    function create_month_label() {
        var del_month = branches[0].length / (13);
        var left = 0;

        month_branch = new Array();
        for (var branch_index = 0; branch_index < branches.length; branch_index++) {
            month_branch [branch_index] = {month_branch: new Array()};
            del_month = branches[branch_index].length / (13);
            var left = 0;
            var top = 0
            if (branch_index % 2 == 0) {
                left = 42;
                top = 0;
            }

            var birth_month = parseInt($("#student_birth_month").val());
            var temp_month_index = parseInt($("#student_birth_month").val());

            for (var month_index = 0; month_index < months.length; month_index++) {
                temp_month_index = ((birth_month + month_index) % 12);
                month_position[temp_month_index] = month_index;
                var start_point = branches[branch_index].getPointAt((month_index + 1) * del_month);
                month_branch [branch_index].month_branch[temp_month_index] = create_label(start_point, months_label[temp_month_index], left, top);

            }


        }


    }

    function createGround() {
        var ground = new paper.Path({
            strokeColor: '#886e47'

        });

        ground.add(new paper.Point(0, tree_start_y));
        ground.add(new paper.Point(paper.view.size.width, tree_start_y));
        ground.strokeWidth = 2;
        var textPoint = new paper.Point(5, tree_start_y - 5);
        var text = new paper.PointText(textPoint);
        text.fillColor = '#000000';//'#886e47';
        text.content = "LEARNING SHOOTS";
        text.fontSize = 14;
        text.fontWeight = '700';
        text.fontFamily = '"Marvel", sans-serif';

        var textPoint = new paper.Point(142, tree_start_y - 10);
        var text = new paper.PointText(textPoint);
        text.fillColor = '#000000';//'#886e47';
        text.content = "TM";
        text.fontSize = 8;
        text.fontWeight = '700';
        text.fontFamily = '"Marvel", sans-serif';

        textPoint = new paper.Point(5, tree_start_y + 15);
        text = new paper.PointText(textPoint);
        text.fillColor = '#000000';//'#886e47';
        text.content = "LEARNING ROOTS";
        text.fontSize = 14;
        text.fontWeight = '700';
        text.fontFamily = '"Marvel", sans-serif';

        var textPoint = new paper.Point(132, tree_start_y + 10);
        var text = new paper.PointText(textPoint);
        text.fillColor = '#000000';//'#886e47';
        text.content = "TM";
        text.fontSize = 8;
        text.fontWeight = '700';
        text.fontFamily = '"Marvel", sans-serif';

        return ground;
    }

    function createTree() {

        tree_start_x = tree_start_x;
        var tree_end_x = tree_start_x;
        var tree_end_y = 220;

        var mid_point_x = tree_start_x;
        var mid_point_y = tree_start_y + (tree_end_y - tree_start_y) / 2;
        var point1 = new paper.Point(tree_start_x, tree_start_y);
        var point4 = new paper.Point(tree_end_x, tree_end_y, 1)
        var point2 = new paper.Point(-10, -(tree_start_y - tree_end_y) / 2);
        var point3 = new paper.Point(30, 100)///*****************************************importnat*****


        var curve = new paper.Curve(point1, point2, point3, point4);
        var path1 = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
        path1.strokeColor = 'black'
        // draw the rest
        tree_start_x = tree_end_x;
        tree_start_y = tree_end_y;
        tree_end_x = tree_start_x;
        tree_end_y = tree_end_y - 200;///*****************************************importnat*****
        var point5 = new paper.Point(tree_start_x, tree_start_y);
        var point8 = new paper.Point(tree_end_x, tree_end_y)
        var point6 = new paper.Point(-35, -100);
        var point7 = new paper.Point(0, 0)


        curve = new paper.Curve(point5, point6, point7, point8);
        var path2 = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'red'});
        path1.strokeWidth = 1;
        path2.strokeWidth = 1;
        path1.join(path2);
        var m1 = path1.clone();
        var m2 = path1.clone();

        var tempx = point1.x;
        var tempx2 = point4.x;
        var tempx3 = point5.x;
        point1.x += 1;
        point4.x += 1;
        point5.x += 1;


        curve = new paper.Curve(point1, point2, point3, point4);
        var right_path1 = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
        path1.strokeColor = 'black'
        curve = new paper.Curve(point5, point6, point7, point8);
        var right_path2 = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
        right_path1.strokeWidth = 1;
        right_path1.join(right_path2);
        //temp_path1.join(m1);
        // right_path1.fillColor='black';
        point1.x = tempx;
        point4.x = tempx2;
        point5.x = tempx3;
        point1.x -= 1;
        point4.x -= 1;
        point5.x -= 1;

        curve = new paper.Curve(point1, point2, point3, point4);
        var left_path1 = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
        path1.strokeColor = 'black'
        curve = new paper.Curve(point5, point6, point7, point8);
        var left_path2 = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
        left_path1.strokeWidth = 1;
        left_path1.join(left_path2);
        // 
        //left_path1.fillColor='black';
        right_path1.fillColor = 'black';
        right_path1.join(left_path1);
        return path1;


    }

    function reverse(s) {
        var o = '';
        for (var i = s.length - 1; i >= 0; i--)
            o += s[i];
        return o;
    }

    function createAlignedText(str, path, style, flip) {
        if (str && str.length > 0 && path) {
            // create PointText object for each glyph
            if (flip == true)
                str = reverse(str);
            var glyphTexts = [];
            for (var i = 0; i < str.length; i++) {
                glyphTexts[i] = createPointText(str.substring(i, i + 1), style);
                glyphTexts[i].justification = "center";
            }
            // for each glyph find center xOffset
            var xOffsets = [0];
            for (var i = 1; i < str.length; i++) {
                var pairText = createPointText(str.substring(i - 1, i + 1), style);
                pairText.remove();
                xOffsets[i] = xOffsets[i - 1] + pairText.bounds.width -
                    glyphTexts[i - 1].bounds.width / 2 - glyphTexts[i].bounds.width / 2;
            }
            // set point for each glyph and rotate glyph aorund the point
            for (var i = 0; i < str.length; i++) {
                var centerOffs = xOffsets[i];
                if (path.length < centerOffs) {
                    if (path.closed) {
                        centerOffs = centerOffs % path.length;
                    } else {
                        centerOffs = undefined;
                    }
                }
                if (centerOffs === undefined) {
                    glyphTexts[i].remove();
                } else {
                    var pathPoint = path.getPointAt(centerOffs);
                    glyphTexts[i].point = pathPoint;
                    glyphTexts[i].point.x = glyphTexts[i].point.x + 2;
                    glyphTexts[i].point.y = glyphTexts[i].point.y - 4;
                    var tan = path.getTangentAt(centerOffs);
                    glyphTexts[i].rotate(tan.angle, pathPoint);
                    if (flip == true)
                        glyphTexts[i].rotate(-180, pathPoint);
                    //var temp = glyphTexts[i].clone();
                    //temp.fontSize = temp.fontSize+2;
                    //glyphTexts[i].scale(1.2, 1.2);
                }
            }
        }
    }


    // create a PointText object for a string and a style
    function createPointText(str, style) {
        var text = new paper.PointText();
        text.content = str;
        if (style) {
            if (style.font)
                text.font = style.font;
            if (style.fontFamily)
                text.fontFamily = style.fontFamily;
            if (style.fontSize)
                text.fontSize = 14;//style.fontSize;
            if (style.fontWieght)
                text.fontWeight = 'bold';//// style.fontWeight;
            if (style.fillColor)
                text.fillColor = style.fillColor;
            text.strokeWidth = 6;
            text.blendMode = 'multiply';
        }
        return text;
    }

    function createRoots() {
        var roots = new Array();
        /*
         for(var index=0; index<self.treeData.strands.length; index++){
         var multiplier=4;
         if(index>self.treeData.strands.length/2)
         multiplier = multiplier*(-1);
         roots [index] = create_path(root_starts[index],root_ends[index],root_color[index])
         var textPoint  = roots [index].getPointAt(roots [index].length);
         var text = new paper.PointText(new paper.Point(textPoint.x+10,textPoint.y));
         text.fillColor =root_color[index];
         text.content = self.treeData.strands[index].name;

         }*/

        /*	var tree_width = 611.6000366210938;
         var tree_height = 901.6000366210938;
         var tree_start_x=tree_width/2;
         var tree_start_y=tree_height-200;	*/
        var roots_data = [
            {
                data: [
                    {
                        root_start_x: tree_start_x,
                        root_start_y: tree_start_y,
                        root_end_x: tree_start_x - 190, //09Aug
                        root_end_y: tree_start_y + 50, //09Aug
                        first_offset_x: -30,
                        first_offset_y: 70,
                        second_offset_x: 90,
                        second_offset_y: -50,
                        has_branch: 0,
                        branch: {
                            root_start_x: tree_start_x,
                            root_start_y: tree_start_y,
                            root_end_x: tree_start_x - 300,
                            root_end_y: tree_start_y + 100,
                            first_offset_x: -30,
                            first_offset_y: 20,
                            second_offset_x: 30,
                            second_offset_y: -80

                        }
                    },
                    {
                        root_start_x: tree_start_x,
                        root_start_y: tree_start_y,
                        root_end_x: tree_start_x - 180, //09Aug
                        root_end_y: tree_start_y + 80, //09Aug
                        first_offset_x: -30,
                        first_offset_y: 120, //09Aug
                        second_offset_x: 60,
                        second_offset_y: -50, //09Aug
                        has_branch: 0,
                        branch: {
                            root_start_x: tree_start_x,
                            root_start_y: tree_start_y,
                            root_end_x: tree_start_x - 235,
                            root_end_y: tree_start_y + 165,
                            first_offset_x: -30,
                            first_offset_y: 20,
                            second_offset_x: 30,
                            second_offset_y: -105

                        }

                    },
                    {
                        root_start_x: tree_start_x,
                        root_start_y: tree_start_y,
                        root_end_x: tree_start_x - 100, //09Aug
                        root_end_y: tree_start_y + 140, //09Aug
                        first_offset_x: -30,
                        first_offset_y: 125,
                        second_offset_x: 30,
                        second_offset_y: -100,
                        has_branch: 0

                    },
                    //

                    {// Root 4
                        root_start_x: tree_start_x,
                        root_start_y: tree_start_y,
                        root_end_x: tree_start_x,
                        root_end_y: tree_start_y + 140,
                        first_offset_x: 0,
                        first_offset_y: 0,
                        second_offset_x: -0,
                        second_offset_y: -0,
                        has_branch: 0

                    },
                    //
                    {// Root 7 == Root 5
                        root_start_x: tree_start_x,
                        root_start_y: tree_start_y,
                        root_end_x: tree_start_x + 100,
                        root_end_y: tree_start_y + 140,
                        first_offset_x: 30,
                        first_offset_y: 125,
                        second_offset_x: -30,
                        second_offset_y: -100,
                        has_branch: 0
                    },
                    {
                        root_start_x: tree_start_x,
                        root_start_y: tree_start_y,
                        root_end_x: tree_start_x + 180, //09Aug
                        root_end_y: tree_start_y + 80, //09Aug
                        first_offset_x: 30,
                        first_offset_y: 120, //09Aug
                        second_offset_x: -60,
                        second_offset_y: -50, //09Aug
                        has_branch: 0,
                        branch: {
                            root_start_x: tree_start_x,
                            root_start_y: tree_start_y,
                            root_end_x: tree_start_x + 235,
                            root_end_y: tree_start_y + 165,
                            first_offset_x: 30,
                            first_offset_y: 20,
                            second_offset_x: -30,
                            second_offset_y: -105

                        }

                    },
                    {
                        root_start_x: tree_start_x,
                        root_start_y: tree_start_y,
                        root_end_x: tree_start_x + 200, //09Aug
                        root_end_y: tree_start_y + 50, //09Aug
                        first_offset_x: 30,
                        first_offset_y: 70,
                        second_offset_x: -90,
                        second_offset_y: -50,
                        has_branch: 0,
                        branch: {
                            root_start_x: tree_start_x,
                            root_start_y: tree_start_y,
                            root_end_x: tree_start_x + 300,
                            root_end_y: tree_start_y + 100,
                            first_offset_x: 30,
                            first_offset_y: 20,
                            second_offset_x: -30,
                            second_offset_y: -80

                        }


                    }
                ]
            }/*,
             {}*/
        ];
        //console.log(roots_data[0].data.length);
        for (var index = 0; index < roots_data.length; index++) {
            for (var sub_index = 0; sub_index < roots_data[index].data.length; sub_index++) {
                //	console.log(roots_data[index].data[sub_index]);
                var start_point = new paper.Point(roots_data[index].data[sub_index].root_start_x, roots_data[index].data[sub_index].root_start_y);
                var end_point = new paper.Point(roots_data[index].data[sub_index].root_end_x, roots_data[index].data[sub_index].root_end_y);
                var point2 = new paper.Point(roots_data[index].data[sub_index].first_offset_x, roots_data[index].data[sub_index].first_offset_y);
                var point3 = new paper.Point(roots_data[index].data[sub_index].second_offset_x, roots_data[index].data[sub_index].second_offset_y);
                var curve = new paper.Curve(start_point, point2, point3, end_point);
                var reverse_curve = new paper.Curve(end_point, point3, point2, start_point);

                var root1 = new paper.Path({
                    segments: [curve.segment1, curve.segment2],
                    strokeColor: root_color[sub_index]
                });
                var reverse_root1 = new paper.Path({
                    segments: [reverse_curve.segment1, reverse_curve.segment2],
                    strokeColor: root_color[sub_index]
                });
                root1.strokeColor = root_color[sub_index];
                root1.strokeWidth = 4;
                roots [sub_index] = root1;
                //  console.log(sub_index)
                //  console.log(roots_data[index].data[sub_index].has_branch );
                if (roots_data[index].data[sub_index].has_branch == 1) {
                    // console.log(roots_data[index].data[sub_index].branch)
                    start_point = root1.getPointAt((root1.length / 3));

                    if (sub_index < (roots_data[0].data.length / 2))
                        end_point = new paper.Point(roots_data[index].data[sub_index].branch.root_end_x + 70, roots_data[index].data[sub_index].branch.root_end_y);
                    else
                        end_point = new paper.Point(roots_data[index].data[sub_index].branch.root_end_x - 70, roots_data[index].data[sub_index].branch.root_end_y);
                    //{

                    //end_point = new Point(roots_data[index].data[sub_index].branch.root_end_x-70,roots_data[index].data[sub_index].branch.root_end_y);
                    //  else

                    // start_point  = new Point(roots_data[index].data[sub_index].branch.root_start_x,roots_data[index].data[sub_index].branch.root_start_y);
                    //end_point  = new Point(roots_data[index].data[sub_index].branch.root_end_x,roots_data[index].data[sub_index].branch.root_end_y);
                    point2 = new paper.Point(roots_data[index].data[sub_index].branch.first_offset_x, roots_data[index].data[sub_index].branch.first_offset_y);
                    point3 = new paper.Point(roots_data[index].data[sub_index].branch.second_offset_x, roots_data[index].data[sub_index].branch.second_offset_y);
                    curve = new paper.Curve(start_point, point2, point3, end_point);
                    root1 = new paper.Path({
                        segments: [curve.segment1, curve.segment2],
                        strokeColor: root_color[sub_index]
                    });
                    root1.strokeColor = root_color[sub_index];
                    root1.strokeWidth = 6;
                    // }
                }

                //croots [sub_index].closePath();
                //createAlignedText(root_color[sub_index], roots [sub_index] , {fontSize: 12});
                //roots [sub_index].fillColor='red';
                //var str = root_color[sub_index];
                var str = self.treeData.strands[sub_index].name;
                /*if(sub_index>self.treeData.strands.length/2)
                 str = reverse(str);*/
                var flip = sub_index > self.treeData.strands.length / 2;
                createAlignedText(str, reverse_root1, {
                    fontSize: 14,
                    fillColor: 'black'/* fillColor:root_color[sub_index]*/,
                    fontWieght: '700',
                    fontFamily: '"Marvel", sans-serif'
                }, flip);
                //createAlignedText(self.treeData.strands[sub_index].name, reverse_root1 , {fontSize: 12, fillColor:root_color[sub_index]});
                /*
                 var textPoint  = roots [sub_index].getPointAt(roots [sub_index].length);
                 textPoint.y+= 20;	
                 textPoint.x -= (self.treeData.strands[sub_index].name.length/2)*4;
                 var text = new paper.PointText(new paper.Point(textPoint.x+10,textPoint.y));
                 text.fillColor =root_color[sub_index];
                 //text.content = self.treeData.strands[sub_index].name;
                 text.content =root_color[sub_index];*/
                //break;


            }
            break;

        }
        return roots;
    }

    function draw_branch(start_point, end_point, mid_point) {


        mid_point = new paper.Point((start_point.x + end_point.x) / 2, (start_point.y + end_point.y) / 2);
        var brancha = new paper.Path({
            strokeColor: 'black',
            strokeWidth: 2

        });
        brancha.add(start_point);


        var handleOut = new paper.Point(100, 0);
        var handleIn = new paper.Point(-100, 0);
        if (start_point.x > end_point.x) {
            handleIn = new paper.Point(100, 0);
            handleOut = new paper.Point(-100, 0);
        }
        var added = brancha.add(new paper.Segment(mid_point, handleIn, handleOut));


        brancha.add(end_point);
        //brancha.closed=true;
        return brancha;


    }


    function createBranches() {
        var branches = new Array();
        var del_branch = Math.ceil(tree.length / 8);
        var start_point = tree.getPointAt(0);
        var end_point;
        var length = 1;
        var del_x = [(tree_width / 2) - 10, -1 * ((tree_width / 2) - 10)];
        var end_x = [paper.view.size.width - 20, 20];
        var branch_offset_x = [1, -1];

        var del_y = [-120, -120];

        self.treeData = data;

        for (var temp_index = 1; temp_index < 8; temp_index++) {
            var direction = (temp_index + 1) % 2;
            start_point.x += branch_offset_x[direction];
            var mid_point_x = [start_point.x + (tree_width / 6), start_point.x - (tree_width / 6)];
            end_point = new paper.Point(end_x[direction], start_point.y + del_y[direction]);
            //branches[temp_index-1]=draw_branch(start_point,end_point, new paper.Point(mid_point_x[temp_index%2],start_point.y-20));
            branches[temp_index - 1] = new_draw_branch(start_point, end_point, direction);//, new paper.Point(mid_point_x[temp_index%2],start_point.y-20));
            start_point = tree.getPointAt(del_branch * (temp_index));

        }
        return branches;

    }


    function new_draw_branch(start_point, end_point, direction) {
        var point2 = new paper.Point(50, -100);
        if (direction == 1) {
            point2 = new paper.Point(-50, -100);
            end_point.y = end_point.y + 40;
        } else {
            end_point.x = end_point.x - 20;
            end_point.y = end_point.y + 40;
        }
        var point3 = new paper.Point(0, 0)

        var curve = new paper.Curve(start_point, point2, point3, end_point);
        var path1 = new paper.Path({segments: [curve.segment1, curve.segment2], strokeColor: 'black'});
        path1.strokeColor = 'black'
        path1.strokeWidth = 2
        return path1;
    }

    function create_path(start_point, end_point, color) {
        var path = new paper.Path({
            strokeColor: color,
            strokeWidth: 4

        });
        //path.moveTo(start_point);
        path.add(start_point);
        var m = new paper.Point(((start_point.x + end_point.x) / 2) + 5, ((start_point.y + end_point.y) / 2) - 10);
        var handleIn = new paper.Point(0, 20);
        var handleOut = new paper.Point(0, -40);
        path.add(new paper.Segment(m, handleIn, handleOut));

        path.add(end_point);
        //path.closed=true;
        return path;


    }

};