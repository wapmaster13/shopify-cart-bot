if (void 0 === window.giftbeeloaded || null === document.getElementById("giftbee-loaded")) {
    try {
        window.giftbeeloaded = !0;
        var elem54214243 = document.createElement("div");
        elem54214243.id = "giftbee-loaded", elem54214243.style.cssText = "display:none;", document.body.appendChild(elem54214243)
    } catch (n) {
        console.error(n)
    }! function() {
        var n = {
            bucket: 0,
            capacity: 10,
            delay: 500,
            add: function() {
                this.bucket++, this.clearBucket()
            },
            clearBucketTimeout: null,
            clearBucket: function() {
                null !== this.clearBucketTimeout && clearTimeout(this.clearBucketTimeout);
                var n = this;
                setTimeout((function() {
                    n.bucket = 0
                }), this.delay)
            },
            hasSpace: function() {
                return this.bucket < this.capacity
            }
        };
        ! function(t) {
            for (var e = [{
                    id: 57403,
                    name: "add-biju <200",
                    must_include_any_variant: "true",
                    remove_the_initial_variants: "false",
                    works_in_reverse: "true",
                    status: "enabled",
                    apply_once_per_cart: "true",
                    condition_type: "cart_value",
                    cart_value_min: "70",
                    cart_value_max: "200",
                    cart_value_max_enable: "false",
                    apply_once_per_session: "false",
                    apply_only_on_add_to_cart: "false",
                    products_min: "0",
                    products_max: "",
                    products_max_enable: "false",
                    product_variants_contain: [{
                        product_id: "8431081554184",
                        variant_id: "45119866044680",
                        title: "Inel din Argint Silver Glow - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431081554184",
                        variant_id: "45119866077448",
                        title: "Inel din Argint Silver Glow - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431081554184",
                        variant_id: "45119866110216",
                        title: "Inel din Argint Silver Glow - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431081554184",
                        variant_id: "45119866142984",
                        title: "Inel din Argint Silver Glow - 59",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431100952840",
                        variant_id: "45119913296136",
                        title: "Inel din Argint White Crystal - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431100952840",
                        variant_id: "45119913328904",
                        title: "Inel din Argint White Crystal - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431100952840",
                        variant_id: "45119913361672",
                        title: "Inel din Argint White Crystal - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431100952840",
                        variant_id: "45119913394440",
                        title: "Inel din Argint White Crystal - 59",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431125954824",
                        variant_id: "45119977128200",
                        title: "Inel din Argint Queen - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431125954824",
                        variant_id: "45119977160968",
                        title: "Inel din Argint Queen - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431125954824",
                        variant_id: "45119977193736",
                        title: "Inel din Argint Queen - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431142699272",
                        variant_id: "45120054165768",
                        title: "Inel din Argint Princess - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431142699272",
                        variant_id: "45120054198536",
                        title: "Inel din Argint Princess - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431142699272",
                        variant_id: "45120054231304",
                        title: "Inel din Argint Princess - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431144239368",
                        variant_id: "45120059212040",
                        title: "Inel din Argint Pink Flower - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431144239368",
                        variant_id: "45120059244808",
                        title: "Inel din Argint Pink Flower - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431144239368",
                        variant_id: "45120059277576",
                        title: "Inel din Argint Pink Flower - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431145713928",
                        variant_id: "45120071205128",
                        title: "Inel din Argint Crown - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431145713928",
                        variant_id: "45120071237896",
                        title: "Inel din Argint Crown - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431145713928",
                        variant_id: "45120071270664",
                        title: "Inel din Argint Crown - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431148204296",
                        variant_id: "45120094339336",
                        title: "Inel din Argint Happy Rabbit - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431148204296",
                        variant_id: "45120094372104",
                        title: "Inel din Argint Happy Rabbit - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431150432520",
                        variant_id: "45120118161672",
                        title: "Inel din Argint Pinky Promise - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431150432520",
                        variant_id: "45120118194440",
                        title: "Inel din Argint Pinky Promise - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431150432520",
                        variant_id: "45120118227208",
                        title: "Inel din Argint Pinky Promise - 56",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431162032392",
                        variant_id: "45120146440456",
                        title: "Inel din Argint Ducess - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431162032392",
                        variant_id: "45120146473224",
                        title: "Inel din Argint Ducess - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431304704264",
                        variant_id: "45120524091656",
                        title: "Cercei din Argint Faith - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431306506504",
                        variant_id: "45120526909704",
                        title: "Cercei din Argint Royal Heart - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431310569736",
                        variant_id: "45120536510728",
                        title: "Cercei din Argint Princess - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431310897416",
                        variant_id: "45120536969480",
                        title: "Cercei din Argint Rose Heart - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431311683848",
                        variant_id: "45120539656456",
                        title: "Cercei din Argint Waves - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431311945992",
                        variant_id: "45120540999944",
                        title: "Cercei din Argint Bubble - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431313649928",
                        variant_id: "45120550338824",
                        title: "Cercei din Argint Simple Heart - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431314206984",
                        variant_id: "45120551518472",
                        title: "Cercei din Argint CyberPunk - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431316107528",
                        variant_id: "45120558629128",
                        title: "Cercei din Argint Stars - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431394259208",
                        variant_id: "45120967049480",
                        title: "Colier din Argint Rose Heart - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431397568776",
                        variant_id: "45120984121608",
                        title: "Colier din Argint Pure Love - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431398486280",
                        variant_id: "45120992936200",
                        title: "Colier din Argint Queen - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431398748424",
                        variant_id: "45120993788168",
                        title: "Colier din Argint Faith - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431399469320",
                        variant_id: "45120998703368",
                        title: "TRAVEL - LANT DIN ARGINT S925 - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431419162888",
                        variant_id: "45121103659272",
                        title: "Colier din Argint Butterfly - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431419687176",
                        variant_id: "45121106739464",
                        title: "MYSTIC STAR - LANT DIN ARGINT S925 - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431420244232",
                        variant_id: "45121110049032",
                        title: "Colier din Argint Silver Glow - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431420768520",
                        variant_id: "45121111687432",
                        title: "Coliere din Argint Mama si Fiica - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431148204296",
                        variant_id: "45208907153672",
                        title: "Inel din Argint Happy Rabbit - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8480312557832",
                        variant_id: "45327131541768",
                        title: "Cercei din Argint Cross - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8480667664648",
                        variant_id: "45329179509000",
                        title: "Cercei din Argint Love Duet - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8480671301896",
                        variant_id: "45329208967432",
                        title: "Cercei din Argint Pinky Heart - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8535001039112",
                        variant_id: "45499449606408",
                        title: "Inel ajustabil - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8535001039112",
                        variant_id: "45499449639176",
                        title: "Inel ajustabil - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8535001039112",
                        variant_id: "45499449671944",
                        title: "Inel ajustabil - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8560135012616",
                        variant_id: "45594424017160",
                        title: "Colier din Argint Cross - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8562138939656",
                        variant_id: "45599939166472",
                        title: "Coliere din Argint Surori - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8562152407304",
                        variant_id: "45599962595592",
                        title: "Colier din Argint Steaua Iubirii - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8562183667976",
                        variant_id: "45600013189384",
                        title: "Colier din Argint Kitty Eye - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8563041927432",
                        variant_id: "45601031487752",
                        title: "Cercei din Argint Moon Light - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8563055886600",
                        variant_id: "45601075691784",
                        title: "Cercei din Argint Steaua Iubirii - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8563081609480",
                        variant_id: "45601115963656",
                        title: "Cercei din Argint Kitty Eyes - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8563339854088",
                        variant_id: "45601420509448",
                        title: "Inel din Argint Cross - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8563339854088",
                        variant_id: "45601420542216",
                        title: "Inel din Argint Cross - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8563339854088",
                        variant_id: "45601420574984",
                        title: "Inel din Argint Cross - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8563403161864",
                        variant_id: "45601495351560",
                        title: "Inel din Argint Pure Love - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8563403161864",
                        variant_id: "45601495384328",
                        title: "Inel din Argint Pure Love - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8563403161864",
                        variant_id: "45601495417096",
                        title: "Inel din Argint Pure Love - 56",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8568774590728",
                        variant_id: "45630276206856",
                        title: "Bratara din Argint Steaua Iubirii - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8568777376008",
                        variant_id: "45630285971720",
                        title: "Bratara din Argint Simple Heart - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8568783995144",
                        variant_id: "45630300258568",
                        title: "Bratara din Argint Kitty Eye - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8568785109256",
                        variant_id: "45630306550024",
                        title: "Bratara de picior din Argint Pink Flower - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8568786419976",
                        variant_id: "45630310678792",
                        title: "Bratara din Argint Cross - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8568787042568",
                        variant_id: "45630311989512",
                        title: "Bratara din Argint Love Pets - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570240565512",
                        variant_id: "45634701295880",
                        title: "SET CROSS - BRATARA + CERCEI + INEL + LANTISOR DIN ARGINT S925 - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570240565512",
                        variant_id: "45634701328648",
                        title: "SET CROSS - BRATARA + CERCEI + INEL + LANTISOR DIN ARGINT S925 - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570240565512",
                        variant_id: "45634701361416",
                        title: "SET CROSS - BRATARA + CERCEI + INEL + LANTISOR DIN ARGINT S925 - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570304495880",
                        variant_id: "45634948235528",
                        title: "SET STEAUA Iubirii - BRATARA + CERCEI + LANTISOR DIN ARGINT S925 - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570315833608",
                        variant_id: "45634976022792",
                        title: "SET KITTY EYES - BRATARA + CERCEI + LANTISOR DIN ARGINT S925 - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570321993992",
                        variant_id: "45634998927624",
                        title: "SET ROSE HEART - CERCEI + LANTISOR DIN ARGINT S925 - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570328809736",
                        variant_id: "45635008921864",
                        title: "SET PURE LOVE - INEL + LANTISOR DIN ARGINT S925 - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570328809736",
                        variant_id: "45635008954632",
                        title: "SET PURE LOVE - INEL + LANTISOR DIN ARGINT S925 - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570328809736",
                        variant_id: "45635008987400",
                        title: "SET PURE LOVE - INEL + LANTISOR DIN ARGINT S925 - 56",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570334150920",
                        variant_id: "45635022455048",
                        title: "SET QUEEN - INEL + LANTISOR DIN ARGINT S925 - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570334150920",
                        variant_id: "45635022487816",
                        title: "SET QUEEN - INEL + LANTISOR DIN ARGINT S925 - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570334150920",
                        variant_id: "45635022520584",
                        title: "SET QUEEN - INEL + LANTISOR DIN ARGINT S925 - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570340933896",
                        variant_id: "45635034317064",
                        title: "SET GLOW - INEL + LANTISOR DIN ARGINT S925 - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570340933896",
                        variant_id: "45635034349832",
                        title: "SET GLOW - INEL + LANTISOR DIN ARGINT S925 - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570340933896",
                        variant_id: "45635034382600",
                        title: "SET GLOW - INEL + LANTISOR DIN ARGINT S925 - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570340933896",
                        variant_id: "45635034415368",
                        title: "SET GLOW - INEL + LANTISOR DIN ARGINT S925 - 59",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570347421960",
                        variant_id: "45635044344072",
                        title: "SET PINKY HEART - CERCEI + INEL DIN ARGINT S925 - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570347421960",
                        variant_id: "45635044376840",
                        title: "SET PINKY HEART - CERCEI + INEL DIN ARGINT S925 - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8570347421960",
                        variant_id: "45635044409608",
                        title: "SET PINKY HEART - CERCEI + INEL DIN ARGINT S925 - 56",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431100952840",
                        variant_id: "45636022567176",
                        title: "Inel din Argint White Crystal - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9336597709064",
                        variant_id: "49525306753288",
                        title: "Colier Argint Cruciulita - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431081554184",
                        variant_id: "49568839500040",
                        title: "Inel din Argint Silver Glow - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9352918466824",
                        variant_id: "49568850575624",
                        title: "Cercei din Argint Eiffel - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9352918958344",
                        variant_id: "49568852214024",
                        title: "Cercei din Argint Iris - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9352919286024",
                        variant_id: "49568853098760",
                        title: "Cercei din Argint Pink Butterfly - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9352922104072",
                        variant_id: "49568863453448",
                        title: 'Colier din Argint "Iubire din Inima" - Default Title',
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9352925970696",
                        variant_id: "49568875806984",
                        title: 'Cercei din Argint "Spiritul CrÄƒciunului" - Default Title',
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9507652894984",
                        variant_id: "50143833129224",
                        title: "Inel din argint cu Inimi Infinite - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9507652894984",
                        variant_id: "50143833161992",
                        title: "Inel din argint cu Inimi Infinite - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9507652894984",
                        variant_id: "50144106381576",
                        title: "Inel din argint cu Inimi Infinite - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9507652894984",
                        variant_id: "50144106414344",
                        title: "Inel din argint cu Inimi Infinite - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9507668295944",
                        variant_id: "50144147308808",
                        title: "Inel din Argint Endless Stars - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9507668295944",
                        variant_id: "50144147341576",
                        title: "Inel din Argint Endless Stars - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9507668295944",
                        variant_id: "50144147374344",
                        title: "Inel din Argint Endless Stars - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9507668295944",
                        variant_id: "50144147407112",
                        title: "Inel din Argint Endless Stars - 56",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508543922440",
                        variant_id: "50149264326920",
                        title: "Inel din Argint Eternity - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508543922440",
                        variant_id: "50149270913288",
                        title: "Inel din Argint Eternity - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508543922440",
                        variant_id: "50149270946056",
                        title: "Inel din Argint Eternity - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508543922440",
                        variant_id: "50149270978824",
                        title: "Inel din Argint Eternity - 59",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508547428616",
                        variant_id: "50149282906376",
                        title: "Inel din Argint Icy SnowFlake - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508547428616",
                        variant_id: "50149282939144",
                        title: "Inel din Argint Icy SnowFlake - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508547428616",
                        variant_id: "50149282971912",
                        title: "Inel din Argint Icy SnowFlake - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508547428616",
                        variant_id: "50149283004680",
                        title: "Inel din Argint Icy SnowFlake - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508551393544",
                        variant_id: "50149313609992",
                        title: "Inel din Argint Fulg de Nea - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508551393544",
                        variant_id: "50149313642760",
                        title: "Inel din Argint Fulg de Nea - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508551393544",
                        variant_id: "50149313675528",
                        title: "Inel din Argint Fulg de Nea - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508558635272",
                        variant_id: "50149374689544",
                        title: "Inel din Argint Silver Love - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508558635272",
                        variant_id: "50149374722312",
                        title: "Inel din Argint Silver Love - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508558635272",
                        variant_id: "50149374755080",
                        title: "Inel din Argint Silver Love - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508561551624",
                        variant_id: "50149383373064",
                        title: "Inel din Argint Simply Elegant - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508561551624",
                        variant_id: "50149383405832",
                        title: "Inel din Argint Simply Elegant - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508561551624",
                        variant_id: "50149383438600",
                        title: "Inel din Argint Simply Elegant - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508614930696",
                        variant_id: "50149585256712",
                        title: "Colier din Argint Constelatie - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508616438024",
                        variant_id: "50149592924424",
                        title: "Colier din Argint Crown - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508617289992",
                        variant_id: "50149594136840",
                        title: "Colier din Argint Crystal Snowflake - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508620271880",
                        variant_id: "50149602427144",
                        title: "Colier din Argint TikTok - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508626235656",
                        variant_id: "50149619433736",
                        title: "Colier din Argint Fulg de Nea - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508627972360",
                        variant_id: "50149627068680",
                        title: "Colier din Argint LOVE - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508630102280",
                        variant_id: "50149637718280",
                        title: "Colier din Argint Potcoava Norocoasa - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508631478536",
                        variant_id: "50149639160072",
                        title: "Colier din Argint Trifoi - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508632494344",
                        variant_id: "50149641683208",
                        title: "Colier din Argint Twin Dolphines - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508641800456",
                        variant_id: "50149671731464",
                        title: "Cercei din Argint Fulg de Nea - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508643471624",
                        variant_id: "50149677662472",
                        title: "Cercei din Argint Pink Butterfly - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508646256904",
                        variant_id: "50149686116616",
                        title: "Cercei din Argint Pinky Snowflake - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508647436552",
                        variant_id: "50149687886088",
                        title: "Cercei din Argint Silver Butterfly - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508851515656",
                        variant_id: "50150731153672",
                        title: "Bratara din Argint Infinity - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508852957448",
                        variant_id: "50150739116296",
                        title: "Bratara de picior din Argint Infinity - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508853612808",
                        variant_id: "50150741737736",
                        title: "Bratara de picior din Argint Pets - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508855185672",
                        variant_id: "50150750585096",
                        title: "Bratara de picior din Argint Unicorn - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508856332552",
                        variant_id: "50150753927432",
                        title: "Bratara din Argint Fulg de Nea - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508857184520",
                        variant_id: "50150755991816",
                        title: "Bratara din Argint Potcoava - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9508857970952",
                        variant_id: "50150758940936",
                        title: "Bratara de Picior din Argint Potcoava Curcubeu - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9509634605320",
                        variant_id: "50155142054152",
                        title: "Colier din Argint Crystal Medallion - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "8431125954824",
                        variant_id: "50155675549960",
                        title: "Inel din Argint Queen - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9573572739336",
                        variant_id: "50424042258696",
                        title: "SET FULG DE NEA - INEL + COLIER + CERCEI + BRATARA - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9573572739336",
                        variant_id: "50424042291464",
                        title: "SET FULG DE NEA - INEL + COLIER + CERCEI + BRATARA - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9573572739336",
                        variant_id: "50424042324232",
                        title: "SET FULG DE NEA - INEL + COLIER + CERCEI + BRATARA - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9574734692616",
                        variant_id: "50428152709384",
                        title: "Pandantiv - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9574735315208",
                        variant_id: "50428156936456",
                        title: "Lantisor argint - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9574736068872",
                        variant_id: "50428161818888",
                        title: "Colier din Argint Silver Glow - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9616423911688",
                        variant_id: "50600756117768",
                        title: "Inel din Argint Cupidon - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9616423911688",
                        variant_id: "50600756150536",
                        title: "Inel din Argint Cupidon - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9616423911688",
                        variant_id: "50600756183304",
                        title: "Inel din Argint Cupidon - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9616688546056",
                        variant_id: "50602531881224",
                        title: "Colier din Argint Cupidon - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9616715874568",
                        variant_id: "50602629103880",
                        title: "Colier din Argint Pink Heart - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9616730620168",
                        variant_id: "50602668654856",
                        title: "Cercei din Argint Fulger - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9623501570312",
                        variant_id: "50625862598920",
                        title: "Coliere din Argint Mama si Fiica - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9641526558984",
                        variant_id: "50685857661192",
                        title: "SET CROWN - INEL + LANTISOR DIN ARGINT S925 - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9641526558984",
                        variant_id: "50685857693960",
                        title: "SET CROWN - INEL + LANTISOR DIN ARGINT S925 - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9641526558984",
                        variant_id: "50685857726728",
                        title: "SET CROWN - INEL + LANTISOR DIN ARGINT S925 - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659290845448",
                        variant_id: "50740526579976",
                        title: "Cercei din Argint Angel Wings - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659784888584",
                        variant_id: "50741683683592",
                        title: "Bratara din Argint Stea - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659788820744",
                        variant_id: "50741699674376",
                        title: "Bratara din Argint Angel Wing - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659792916744",
                        variant_id: "50741721628936",
                        title: "Bratara din Argint Scorpion - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659806384392",
                        variant_id: "50741768028424",
                        title: 'Bratara din Argint "X" Tentation - Default Title',
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659808579848",
                        variant_id: "50741772910856",
                        title: "Bratara din Argint Unicorn - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659829518600",
                        variant_id: "50741823013128",
                        title: "Cercei din Argint Fulger - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659840299272",
                        variant_id: "50741866463496",
                        title: "Cercei din Argint Simple Rose - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057500936",
                        title: "Colier din Argint cu Initiale - A",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057533704",
                        title: "Colier din Argint cu Initiale - B",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057566472",
                        title: "Colier din Argint cu Initiale - C",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057599240",
                        title: "Colier din Argint cu Initiale - D",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057632008",
                        title: "Colier din Argint cu Initiale - E",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057664776",
                        title: "Colier din Argint cu Initiale - F",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057697544",
                        title: "Colier din Argint cu Initiale - G",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057730312",
                        title: "Colier din Argint cu Initiale - I",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057763080",
                        title: "Colier din Argint cu Initiale - L",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057795848",
                        title: "Colier din Argint cu Initiale - M",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057828616",
                        title: "Colier din Argint cu Initiale - N",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057861384",
                        title: "Colier din Argint cu Initiale - O",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057894152",
                        title: "Colier din Argint cu Initiale - P",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057926920",
                        title: "Colier din Argint cu Initiale - R",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057959688",
                        title: "Colier din Argint cu Initiale - S",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742057992456",
                        title: "Colier din Argint cu Initiale - T",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "50742058025224",
                        title: "Colier din Argint cu Initiale - U",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10179613950216",
                        variant_id: "51241639772424",
                        title: "Colier din Argint Heartbeat - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "51241728246024",
                        title: "Colier din Argint cu Initiale - H",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "51241847587080",
                        title: "Colier din Argint cu Initiale - J",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "51241847619848",
                        title: "Colier din Argint cu Initiale - K",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "51241847652616",
                        title: "Colier din Argint cu Initiale - Q",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "51241847685384",
                        title: "Colier din Argint cu Initiale - W",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "51241847718152",
                        title: "Colier din Argint cu Initiale - X",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "51241847750920",
                        title: "Colier din Argint cu Initiale - Y",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "9659888140552",
                        variant_id: "51241847783688",
                        title: "Colier din Argint cu Initiale - Z",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224772251912",
                        variant_id: "51416933138696",
                        title: "Colier din Argint Blue Butterfly - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224815800584",
                        variant_id: "51417020039432",
                        title: "Colier din Argint Pink Butterfly - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224830284040",
                        variant_id: "51417058935048",
                        title: "Colier din Argint Pink Desire - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224842408200",
                        variant_id: "51417089048840",
                        title: "Colier din Argint Queen's Tiara - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224854532360",
                        variant_id: "51417123062024",
                        title: "Colier din Argint White Desire - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224861774088",
                        variant_id: "51417141870856",
                        title: "Colier din Argint Cheia Inimii - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224875208968",
                        variant_id: "51417167298824",
                        title: "Colier din Argint Crystal Butterfly - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224889037064",
                        variant_id: "51417202295048",
                        title: "Colier din Argint Emerald Halo - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224899719432",
                        variant_id: "51417228345608",
                        title: "Colier din Argint Green Halo - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224917610760",
                        variant_id: "51417260556552",
                        title: "Colier din Argint Joyful Girl - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224936583432",
                        variant_id: "51417290637576",
                        title: "Colier din Argint Mystic Green - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10224950345992",
                        variant_id: "51417319112968",
                        title: "Colier din Argint Twin Love - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10226988318984",
                        variant_id: "51421413736712",
                        title: "Cercei din Argint Diamond Rose - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227032981768",
                        variant_id: "51421519773960",
                        title: "Cercei din Argint Cheia Inimii - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227062178056",
                        variant_id: "51421585867016",
                        title: "Cercei din Argint Emerald Halo - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227079676168",
                        variant_id: "51421625188616",
                        title: "Cercei din Argint Green Halo - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227089408264",
                        variant_id: "51421651730696",
                        title: "Cercei din Argint Ocean Wave - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227137052936",
                        variant_id: "51421792370952",
                        title: "Cercei din Argint Pink Desire - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227149963528",
                        variant_id: "51421828579592",
                        title: "Cercei din Argint Twin Love - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227164250376",
                        variant_id: "51421900767496",
                        title: "Cercei din Argint Rose Heart - Rose",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227164250376",
                        variant_id: "51421900800264",
                        title: "Cercei din Argint Rose Heart - Silver",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227208749320",
                        variant_id: "51422072406280",
                        title: "Bratara din Argint Pink Butterfly - Pink",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227272450312",
                        variant_id: "51422148985096",
                        title: "Bratara din Argint Angel Wings - Golden",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227272450312",
                        variant_id: "51422149017864",
                        title: "Bratara din Argint Angel Wings - Rose",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227326648584",
                        variant_id: "51422312661256",
                        title: "Bratara din Argint Complex Heart - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227351978248",
                        variant_id: "51422368432392",
                        title: "Bratara din Argint Lucky - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10227388055816",
                        variant_id: "51422461001992",
                        title: "Bratara din Argint Ocean Drops - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10228738097416",
                        variant_id: "51426377040136",
                        title: "Bratara din Argint Purple Bloom - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10228814577928",
                        variant_id: "51426523742472",
                        title: "Bratara din Argint Rose Goddes - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10228838924552",
                        variant_id: "51426573353224",
                        title: "Bratara din Argint Silver Goddes - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10228849180936",
                        variant_id: "51426606678280",
                        title: "Bratara din Argint Silver Hearts - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10228857110792",
                        variant_id: "51426625224968",
                        title: "Bratara din Argint Rose Hearts - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10228866220296",
                        variant_id: "51426644427016",
                        title: "Bratara din Argint White Mirage - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10228876443912",
                        variant_id: "51426667069704",
                        title: "Bratara din Argint White Desire - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10228897186056",
                        variant_id: "51426711863560",
                        title: "Bratara din Argint Rainbow Kiss - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10228907180296",
                        variant_id: "51426740797704",
                        title: "Bratara din Argint Rainbow Flower - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10228923465992",
                        variant_id: "51426799059208",
                        title: "Bratara din Argint Figaro - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230242214152",
                        variant_id: "51430074777864",
                        title: "Inel din Argint Blossom - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230242214152",
                        variant_id: "51430074810632",
                        title: "Inel din Argint Blossom - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230242214152",
                        variant_id: "51430074843400",
                        title: "Inel din Argint Blossom - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230313287944",
                        variant_id: "51430268174600",
                        title: "Inel din Argint Crystal Muse - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230313287944",
                        variant_id: "51430268207368",
                        title: "Inel din Argint Crystal Muse - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230313287944",
                        variant_id: "51430268240136",
                        title: "Inel din Argint Crystal Muse - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230336323848",
                        variant_id: "51430324994312",
                        title: "Inel din Argint Eternal Love - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230336323848",
                        variant_id: "51430325059848",
                        title: "Inel din Argint Eternal Love - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230368370952",
                        variant_id: "51430404489480",
                        title: "Inel din Argint Jade Kiss - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230368370952",
                        variant_id: "51430404522248",
                        title: "Inel din Argint Jade Kiss - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230368370952",
                        variant_id: "51430606438664",
                        title: "Inel din Argint Jade Kiss - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230368370952",
                        variant_id: "51430606471432",
                        title: "Inel din Argint Jade Kiss - 59",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230419718408",
                        variant_id: "51430676824328",
                        title: "Inel din Argint Lucky - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230419718408",
                        variant_id: "51430676857096",
                        title: "Inel din Argint Lucky - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230419718408",
                        variant_id: "51430676889864",
                        title: "Inel din Argint Lucky - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230452257032",
                        variant_id: "51430761595144",
                        title: "Inel din Argint Pink Desire - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230452257032",
                        variant_id: "51430761627912",
                        title: "Inel din Argint Pink Desire - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230452257032",
                        variant_id: "51430761660680",
                        title: "Inel din Argint Pink Desire - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230473425160",
                        variant_id: "51430809043208",
                        title: "Inel din Argint White Desire - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230473425160",
                        variant_id: "51430809075976",
                        title: "Inel din Argint White Desire - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230473425160",
                        variant_id: "51430809108744",
                        title: "Inel din Argint White Desire - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230484730120",
                        variant_id: "51430833619208",
                        title: "Inel din Argint Queen's Tiara - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230484730120",
                        variant_id: "51430833651976",
                        title: "Inel din Argint Queen's Tiara - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230505406728",
                        variant_id: "51430882607368",
                        title: "Inel din Argint Rainbow Kiss - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230505406728",
                        variant_id: "51430882640136",
                        title: "Inel din Argint Rainbow Kiss - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230505406728",
                        variant_id: "51430909411592",
                        title: "Inel din Argint Rainbow Kiss - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230524084488",
                        variant_id: "51430933954824",
                        title: "Inel din Argint Regal Glow - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230524084488",
                        variant_id: "51430933987592",
                        title: "Inel din Argint Regal Glow - 59",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230536306952",
                        variant_id: "51431024722184",
                        title: "Inel din Argint Regal Spark - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230536306952",
                        variant_id: "51431024754952",
                        title: "Inel din Argint Regal Spark - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230536306952",
                        variant_id: "51431024787720",
                        title: "Inel din Argint Regal Spark - 59",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230563242248",
                        variant_id: "51431089799432",
                        title: "Inel din Argint Silver Venom - Ajustabil",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230582247688",
                        variant_id: "51431182336264",
                        title: "Inel din Argint Twin Diamonds - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230582247688",
                        variant_id: "51431228080392",
                        title: "Inel din Argint Twin Diamonds - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230582247688",
                        variant_id: "51431228113160",
                        title: "Inel din Argint Twin Diamonds - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230582247688",
                        variant_id: "51431228145928",
                        title: "Inel din Argint Twin Diamonds - 59",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431266451720",
                        title: "Inel din Argint Zodiacal - VÄƒrsÄƒtor",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431312163080",
                        title: "Inel din Argint Zodiacal - Berbec",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431312195848",
                        title: "Inel din Argint Zodiacal - Rac",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431312228616",
                        title: "Inel din Argint Zodiacal - Capricorn",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431312261384",
                        title: "Inel din Argint Zodiacal - Gemeni",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431312294152",
                        title: "Inel din Argint Zodiacal - Leu",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431312326920",
                        title: "Inel din Argint Zodiacal - BalanÈ›Äƒ",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431312359688",
                        title: "Inel din Argint Zodiacal - PeÈ™ti",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431312392456",
                        title: "Inel din Argint Zodiacal - SÄƒgetÄƒtor",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431312425224",
                        title: "Inel din Argint Zodiacal - Scorpion",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431312457992",
                        title: "Inel din Argint Zodiacal - Taur",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10230612132104",
                        variant_id: "51431312490760",
                        title: "Inel din Argint Zodiacal - FecioarÄƒ",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10232747688200",
                        variant_id: "51435132879112",
                        title: "Set Flower Power - Lantisor + Cercei - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10232830591240",
                        variant_id: "51435284627720",
                        title: "Set Ocean Drops - Lantisor + Cercei - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10232884068616",
                        variant_id: "51435438047496",
                        title: "Set Rainbow Butterfly - Lantisor + Cercei - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10232930763016",
                        variant_id: "51435606442248",
                        title: "Set Rainbow Flower - Lantisor + Cercei - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10232971100424",
                        variant_id: "51435719688456",
                        title: "Set Silver Stars - Lantisor + Cercei - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10234019381512",
                        variant_id: "51438552580360",
                        title: "Colier din Argint Forzentina - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10234025869576",
                        variant_id: "51438571847944",
                        title: "Colier din Argint Silver Forzentina - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10472220885256",
                        variant_id: "52232232370440",
                        title: "Bratara de picior din Argint Unicorn - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10601661497608",
                        variant_id: "52819973505288",
                        title: "Colier din Argint Calut de Mare - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10716889710856",
                        variant_id: "53175287972104",
                        title: "Bratara din Argint Golden Angel - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10716894396680",
                        variant_id: "53175298982152",
                        title: "Bratara din Argint Golden Heart - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10716898492680",
                        variant_id: "53175319986440",
                        title: "Bratara din Argint Golden Trio - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10716900131080",
                        variant_id: "53175323328776",
                        title: "Bratara din Argint Silver Trio - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10716981068040",
                        variant_id: "53175881105672",
                        title: "Cercei din Argint Mystic Opal - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10716983623944",
                        variant_id: "53175893885192",
                        title: "Cercei din Argint Amber Glow - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10716995092744",
                        variant_id: "53175993860360",
                        title: "Colier din Argint Golden Kiss - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10716996403464",
                        variant_id: "53176062017800",
                        title: "Colier din Argint Silver Kiss - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10716996894984",
                        variant_id: "53176064114952",
                        title: "Colier din Argint Golden Unicorn - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717585670408",
                        variant_id: "53178295419144",
                        title: "Colier din Argint Little Devil - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717608411400",
                        variant_id: "53178335199496",
                        title: "Colier din Argint Rainbow Chackra - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717636985096",
                        variant_id: "53178393002248",
                        title: "Colier din Argint Rainbow Wings - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717639147784",
                        variant_id: "53178397524232",
                        title: "Colier din Argint Silver Heart - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717642293512",
                        variant_id: "53178401751304",
                        title: "Colier din Argint Steaua Nordului - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717645799688",
                        variant_id: "53178407878920",
                        title: "Colier din Argint Tropical Flamingo - Default Title",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717686104328",
                        variant_id: "53178588299528",
                        title: "Inel din Argint Azure Opal - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717686104328",
                        variant_id: "53178588332296",
                        title: "Inel din Argint Azure Opal - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717686104328",
                        variant_id: "53178588365064",
                        title: "Inel din Argint Azure Opal - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717691150600",
                        variant_id: "53178595803400",
                        title: "Inel din Argint Golden Crystal - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717691150600",
                        variant_id: "53178595836168",
                        title: "Inel din Argint Golden Crystal - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717691150600",
                        variant_id: "53178595868936",
                        title: "Inel din Argint Golden Crystal - 56",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717691150600",
                        variant_id: "53178598392072",
                        title: "Inel din Argint Golden Crystal - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717809836296",
                        variant_id: "53179083882760",
                        title: "Inel din Argint Golden Harmony - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717809836296",
                        variant_id: "53179083915528",
                        title: "Inel din Argint Golden Harmony - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717809836296",
                        variant_id: "53179083948296",
                        title: "Inel din Argint Golden Harmony - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717814161672",
                        variant_id: "53179095613704",
                        title: "Inel din Argint Infinity Crystals - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717814161672",
                        variant_id: "53179095646472",
                        title: "Inel din Argint Infinity Crystals - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717814161672",
                        variant_id: "53179095679240",
                        title: "Inel din Argint Infinity Crystals - 56",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717823467784",
                        variant_id: "53179142865160",
                        title: "Inel Din Argint Make a Wish - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717823467784",
                        variant_id: "53179142897928",
                        title: "Inel Din Argint Make a Wish - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717823467784",
                        variant_id: "53179142930696",
                        title: "Inel Din Argint Make a Wish - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717830086920",
                        variant_id: "53179175993608",
                        title: "Inel din Argint Opal Blush - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717830086920",
                        variant_id: "53179176026376",
                        title: "Inel din Argint Opal Blush - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717830086920",
                        variant_id: "53179176059144",
                        title: "Inel din Argint Opal Blush - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717835034888",
                        variant_id: "53179201356040",
                        title: "Inel Din Argint Opal Drop - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717835034888",
                        variant_id: "53179201388808",
                        title: "Inel Din Argint Opal Drop - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717835034888",
                        variant_id: "53179201421576",
                        title: "Inel Din Argint Opal Drop - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717848174856",
                        variant_id: "53179263779080",
                        title: "Inel din Argint Pink Fairytail - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717848174856",
                        variant_id: "53179263811848",
                        title: "Inel din Argint Pink Fairytail - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717848174856",
                        variant_id: "53179263844616",
                        title: "Inel din Argint Pink Fairytail - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717848174856",
                        variant_id: "53179292352776",
                        title: "Inel din Argint Pink Fairytail - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717854335240",
                        variant_id: "53179309555976",
                        title: "Inel din Argint Rainbow Crystal - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717854335240",
                        variant_id: "53179309588744",
                        title: "Inel din Argint Rainbow Crystal - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717854335240",
                        variant_id: "53179309621512",
                        title: "Inel din Argint Rainbow Crystal - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717854335240",
                        variant_id: "53179309654280",
                        title: "Inel din Argint Rainbow Crystal - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717881565448",
                        variant_id: "53179535950088",
                        title: "Inel din Argint SweetHeart - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717881565448",
                        variant_id: "53179535982856",
                        title: "Inel din Argint SweetHeart - 52",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717881565448",
                        variant_id: "53179536015624",
                        title: "Inel din Argint SweetHeart - 54",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717881565448",
                        variant_id: "53179536048392",
                        title: "Inel din Argint SweetHeart - 57",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }, {
                        product_id: "10717814161672",
                        variant_id: "53180086026504",
                        title: "Inel din Argint Infinity Crystals - 49",
                        selling_plan_name: "One-time purchase or any selling plan",
                        selling_plan_id: "one_time_or_any",
                        quantity: 1
                    }],
                    product_variants_add: [{
                        product_id: "9462656336136",
                        variant_id: "49961879765256",
                        title: "BIJUTERIE CADOU - ARIGNT 925 - Default Title",
                        selling_plan_name: "",
                        selling_plan_id: "",
                        quantity: 1
                    }],
                    use_date_condition: "false",
                    date_from: null,
                    date_to: null,
                    type: "classic",
                    psp_title: "",
                    psp_description: "",
                    ask_for_confirmation: "false",
                    confirmation_title: "",
                    confirmation_description: "",
                    restrict_amount_to_products_included: "false",
                    add_products_even_if_already_in_the_cart: "true"
                }, {
                    id: 65460,
                    name: "Impachetare",
                    must_include_any_variant: "false",
                    remove_the_initial_variants: "false",
                    works_in_reverse: "true",
                    status: "enabled",
                    apply_once_per_cart: "true",
                    condition_type: "cart_value",
                    cart_value_min: "0.1",
                    cart_value_max: "",
                    cart_value_max_enable: "false",
                    apply_once_per_session: "false",
                    apply_only_on_add_to_cart: "false",
                    products_min: "0",
                    products_max: "",
                    products_max_enable: "false",
                    product_variants_contain: [],
                    product_variants_add: [{
                        product_id: "9578519986440",
                        variant_id: "50442072916232",
                        title: "Impachetare Cadou - DivaSilver - Default Title",
                        selling_plan_name: "",
                        selling_plan_id: "",
                        quantity: 1
                    }],
                    use_date_condition: "false",
                    date_from: null,
                    date_to: null,
                    type: "classic",
                    psp_title: "",
                    psp_description: "",
                    ask_for_confirmation: "false",
                    confirmation_title: "",
                    confirmation_description: "",
                    restrict_amount_to_products_included: "false",
                    add_products_even_if_already_in_the_cart: "false"
                }], i = [], a = (new Date).getTime(), l = 0; l < e.length; l++) {
                var r = !0;
                if (void 0 !== e[l].use_date_condition && "true" === e[l].use_date_condition) {
                    if (void 0 !== e[l].date_from && null !== e[l].date_from && "" !== e[l].date_from.trim()) new Date(e[l].date_from).getTime() > a && (r = !1);
                    if (void 0 !== e[l].date_to && null !== e[l].date_to && "" !== e[l].date_to.trim()) new Date(e[l].date_to).getTime() < a && (r = !1)
                }!0 === r && i.push(e[l])
            }
            if ("undefined" != typeof Shopify && void 0 !== Shopify.currency && void 0 !== Shopify.currency.rate)
                for (var o = 1 * Shopify.currency.rate, _ = 0; _ < i.length; _++) {
                    var d = i[_];
                    "cart_value" !== d.condition_type && "cart_value_and_products" !== d.condition_type && "n_products_and_cart_value" !== d.condition_type || ("" !== d.cart_value_min && (d.cart_value_min = d.cart_value_min * o), "" !== d.cart_value_max && (d.cart_value_max = d.cart_value_max * o))
                }
            var s = [];

            function c(n, t, e) {
                void 0 !== s[n] && clearTimeout(s[n]), s[n] = setTimeout(t, e)
            }
            var u, p, g, y, m = {
                    cart: {
                        _cartData: {
                            items: []
                        },
                        get cartData() {
                            if (0 === this._cartData.items.length) {
                                var n = u.get("cart");
                                if (!1 !== n) return n
                            }
                            return this._cartData
                        },
                        set cartData(n) {
                            this._cartData = n
                        },
                        clearCartData() {
                            this.cartData = {
                                items: []
                            }, u.save("cart", JSON.stringify({
                                items: []
                            }))
                        },
                        cartCache: {},
                        get: function(t, e) {
                            if (void 0 === t && (t = !0), void 0 === e && (e = !0), t) {
                                var i = Date.now();
                                if (i = Math.round(i / 1500), void 0 !== a.cartCache[i] && Object.keys(a.cartCache[i]).length > 0) {
                                    h && console.log("---- reading cart data from cache via promise ----");
                                    var a = this,
                                        l = new Promise(((n, t) => {
                                            n(new Response(JSON.stringify(a.cartCache[i]), {
                                                status: 200,
                                                statusText: "Smashing success!"
                                            }))
                                        }));
                                    return !1, l
                                }
                            }
                            if (!1 === n.hasSpace()) return console.log("leaky bucket is full"), null;
                            n.add(), a = this;
                            var r = fetch(p.getRootUrl() + "cart.json?cartbot-cart-call", {
                                method: "GET",
                                cache: "no-cache",
                                credentials: "same-origin",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then((function(n) {
                                return n.clone().json().then((function(t) {
                                    var i = JSON.parse(JSON.stringify(t));
                                    if (void 0 !== window.bndlr && "function" == typeof window.bndlr.updateCartWithDiscounts) try {
                                        var l = window.bndlr.updateCartWithDiscounts(i);
                                        void 0 !== l.discounted_cart_object && (i = l.discounted_cart_object, i = a.reorderCartItemsIfNeeded(i))
                                    } catch (n) {
                                        console.log(n)
                                    }
                                    h && console.log("---- saving cart data to cache ----", JSON.parse(JSON.stringify(i))), a.cartData = JSON.parse(JSON.stringify(i)), a.cartData = JSON.parse(JSON.stringify(i));
                                    var r = Date.now();
                                    return r = Math.round(r / 1500), a.cartCache[r] = JSON.parse(JSON.stringify(i)), !1, e && u.save("cart", JSON.stringify(i)), n
                                }))
                            }));
                            return r
                        },
                        reorderCartItemsIfNeeded: function(n) {
                            var t = JSON.parse(JSON.stringify(n));
                            for (var e in t.items = [], n.items) n.items.hasOwnProperty(e) && ("undefined" !== n.items[e].original_line_item_id ? t.items[1 * n.items[e].original_line_item_id] = JSON.parse(JSON.stringify(n.items[e])) : t.items.push(JSON.parse(JSON.stringify(n.items[e]))));
                            return t
                        }
                    },
                    nav: p = {
                        getRootUrl: function() {
                            return window.location.origin ? window.location.origin + "/" : window.location.protocol + "/" + window.location.host + "/"
                        },
                        isHomePage: function() {
                            return "/" === window.location.pathname
                        },
                        isProductPage: function() {
                            return !!/\/products\/([^\?\/\n]+)/.test(window.location.href)
                        },
                        isCartPage: function() {
                            return !!/\/cart\/?/.test(window.location.href)
                        },
                        getProductHandle: function(n) {
                            if (void 0 === n && (n = (n = window.location.href).replace("/products/products", "/products")), /\/products\/([^\?\/\n]+)/.test(n)) {
                                var t = n.match(/\/products\/([^\?\/\n]+)/);
                                if (void 0 !== t[1]) try {
                                    return decodeURIComponent(t[1]).replace("#", "")
                                } catch (n) {
                                    return t[1].replace("#", "")
                                }
                            }
                            return !1
                        },
                        getAppApiEndpoint: function() {
                            return "https://app.cart-bot.net/public/api/"
                        },
                        getInvoiceEndpoint: function() {
                            return this.getAppApiEndpoint() + "cdo.php?shop=9cefe1-3.myshopify.com"
                        },
                        getSellingPlanId: function() {
                            var n = this.getQueryParams(window.location.search);
                            return void 0 !== n.selling_plan ? n.selling_plan : ""
                        },
                        getQueryParams: function(n) {
                            n = n.split("+").join(" ");
                            for (var t, e = {}, i = /[?&]?([^=]+)=([^&]*)/g; t = i.exec(n);) e[decodeURIComponent(t[1])] = decodeURIComponent(t[2]);
                            return e
                        },
                        reload: function() {
                            window.location = self.location, window.location.reload(!0)
                        },
                        isQueryParameterSet: function(n) {
                            return void 0 !== this.getQueryParams(window.location.search)[n]
                        }
                    },
                    cartbot: {
                        getDefaultCurrency: function() {
                            if ("undefined" != typeof Shopify && void 0 !== Shopify.currency && void 0 !== Shopify.currency.active) var n = Shopify.currency.active;
                            else n = "USD";
                            return n
                        }
                    },
                    string: {
                        getRandomString: function(n) {
                            for (var t = "abcdefghijklmnopqrstuvwxyz0123456789", e = t.length, i = [], a = 0; a < n; a++) i.push(t.charAt(Math.floor(Math.random() * e)));
                            return i.join("")
                        }
                    },
                    queue: {
                        queue: {},
                        add: function(n, t, e) {
                            void 0 === this.queue[n] && (this.queue[n] = {
                                finish: e,
                                q: [],
                                tick: 0
                            }), this.queue[n].q.push(t)
                        },
                        process: function(n) {
                            if (void 0 !== this.queue[n]) {
                                this.queue[n].q.length;
                                var t = this.queue[n].tick;
                                void 0 !== this.queue[n].q[t] && (this.queue[n].q[t](), this.tick(n))
                            }
                        },
                        tick: function(n) {
                            void 0 !== this.queue[n] && (this.queue[n].tick++, this.queue[n].tick === this.queue[n].q.length ? (this.queue[n].finish(), delete this.queue[n]) : this.process(n))
                        },
                        cancel: function(n) {
                            delete this.queue[n]
                        }
                    },
                    promiseQueue: g = {
                        queue: {},
                        add: function(n, t, e) {
                            void 0 === this.queue[n] && (this.queue[n] = {
                                finish: e,
                                q: [],
                                tick: 0
                            }), this.queue[n].q.push(t)
                        },
                        process: function(n) {
                            if (void 0 !== this.queue[n]) {
                                this.queue[n].q.length;
                                var t = this.queue[n].tick;
                                void 0 !== this.queue[n].q[t] && this.queue[n].q[t]().then((function() {
                                    setTimeout((function() {
                                        g.tick(n)
                                    }), 10)
                                }))
                            }
                        },
                        tick: function(n) {
                            void 0 !== this.queue[n] && (this.queue[n].tick++, this.queue[n].tick === this.queue[n].q.length ? (this.queue[n].finish(), delete this.queue[n]) : this.process(n))
                        },
                        cancel: function(n) {
                            delete this.queue[n]
                        }
                    },
                    cookie: {
                        key: "cartbot_data_",
                        maxAge: 36e5,
                        set: function(n, t, e) {
                            var i = new Date;
                            n = this.key + n;
                            var a = {
                                data: JSON.parse(t),
                                time: (new Date).getTime()
                            };
                            if (t = JSON.stringify(a), e > 0) {
                                i.setTime(i.getTime() + 24 * e * 60 * 60 * 1e3);
                                var l = "expires=" + i.toUTCString();
                                document.cookie = n + "=" + t + ";" + l + ";path=/"
                            } else document.cookie = n + "=" + t + ";path=/"
                        },
                        get: function(n) {
                            var t = (n = this.key + n) + "=",
                                e = document.cookie;
                            e = e.split(";");
                            for (var i = [], a = 0; a < e.length; a++) try {
                                i.push(decodeURIComponent(e[a].trim(" ")))
                            } catch (n) {
                                console.error(e[a])
                            }
                            var l = "";
                            for (a = 0; a < i.length; a++) {
                                for (var r = i[a];
                                    " " == r.charAt(0);) r = r.substring(1);
                                0 == r.indexOf(t) && (l = r.substring(t.length, r.length), a = i.length)
                            }
                            try {
                                var o = JSON.parse(l);
                                return void 0 === o.time ? l : o.time < (new Date).getTime() - this.maxAge ? "" : JSON.stringify(o.data)
                            } catch (n) {}
                            return ""
                        }
                    },
                    local: u = {
                        key: "cartbot_data_",
                        save: function(n, t) {
                            try {
                                localStorage.setItem(this.getKey() + n, t)
                            } catch (n) {
                                console.log("Error when saving data", n)
                            }
                        },
                        get: function(n) {
                            try {
                                var t = localStorage.getItem(this.getKey() + n);
                                return JSON.parse(t)
                            } catch (n) {
                                return !1
                            }
                            return !1
                        },
                        getKey: function() {
                            return this.key
                        }
                    },
                    sessionStorage: {
                        key: "cartbot_data_",
                        save: function(n, t) {
                            try {
                                sessionStorage.setItem(this.getKey() + n, t)
                            } catch (n) {
                                console.log("Error when saving data", n)
                            }
                        },
                        get: function(n) {
                            try {
                                var t = sessionStorage.getItem(this.getKey() + n);
                                return JSON.parse(t)
                            } catch (n) {
                                return !1
                            }
                            return !1
                        },
                        getKey: function() {
                            return this.key
                        }
                    },
                    money: {
                        currencySymbols: {
                            USD: "$",
                            CAD: "$",
                            AUD: "$",
                            NZD: "$",
                            CLP: "$",
                            EUR: "â‚¬",
                            CRC: "â‚¡",
                            GBP: "Â£",
                            ILS: "â‚ª",
                            INR: "â‚¹",
                            JPY: "Â¥",
                            KRW: "â‚©",
                            NGN: "â‚¦",
                            PHP: "â‚±",
                            PLN: "zÅ‚",
                            PYG: "â‚²",
                            THB: "à¸¿",
                            UAH: "â‚´",
                            VND: "â‚«"
                        },
                        formatPrice: function(n, t) {
                            if ("undefined" != typeof Shopify && Shopify.hasOwnProperty("currency") && Shopify.currency.hasOwnProperty("rate")) {
                                var e, i = Shopify.currency.active,
                                    a = Shopify.currency.rate,
                                    l = "";
                                if (-1 !== l.indexOf("{{iso_currency}}") && (l = l.replace("{{iso_currency}}", i)), -1 !== l.indexOf("{{currency_symbol}}"))
                                    if ("string" == typeof this.currencySymbols[i]) {
                                        var r = this.currencySymbols[i];
                                        l = l.replace("{{currency_symbol}}", r)
                                    } else l = l.replace("{{currency_symbol}}", "");
                                return void 0 === t && (t = !1), t && "1.0" !== a && (n = this.convertMoney(n, a, i)), e = l, this.formatMoney(n, e, i || this.getDefaultCurrency())
                            }
                            return ""
                        },
                        formatMoney: function(n, t, e, i) {
                            void 0 === i && (i = "up");
                            try {
                                "string" == typeof n && (n = n.replace(".", ""));
                                var a = "",
                                    l = /\{\{\s*(\w+)\s*\}\}/,
                                    r = t;

                                function o(n, t) {
                                    return void 0 === n ? t : n
                                }

                                function _(n, t, e, i, a) {
                                    if (t = o(t, 2), e = o(e, ","), i = o(i, "."), a = o(a, "up"), isNaN(n) || null == n) return 0;
                                    var l = n;
                                    n = (n / 100).toFixed(t), "down" === a && l / 100 - n == -.5 && (n = (n -= 1).toString());
                                    var r = n.split(".");
                                    return r[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + e) + (r[1] ? i + r[1] : "")
                                }
                                switch (r.match(l)[1]) {
                                    case "amount":
                                        a = _(n, 2);
                                        break;
                                    case "amount_no_decimals":
                                        a = _(n, 0, ",", ".", i);
                                        break;
                                    case "amount_with_comma_separator":
                                        a = _(n, 2, ".", ",");
                                        break;
                                    case "amount_with_decimal_separator":
                                        a = _(n, 2, ",", ".");
                                        break;
                                    case "amount_no_decimals_with_comma_separator":
                                        a = _(n, 0, ".", ",", i);
                                        break;
                                    case "amount_no_decimals_with_space_separator":
                                        a = _(n, 0, " ", ",", i);
                                        break;
                                    case "amount_with_apostrophe_separator":
                                        a = _(n, 2, "'", ".")
                                }
                                return r.replace(l, a)
                            } catch (d) {
                                return price = n / 100, price.toLocaleString(void 0, {
                                    style: "currency",
                                    currency: e
                                })
                            }
                        },
                        convertMoney: function(n, t, e, i) {
                            return n <= 0 ? 0 : (n *= t, i && (-1 !== ["USD", "CAD", "AUD", "NZD", "SGD", "HKD", "GBP"].indexOf(e) ? n = Math.ceil(n) : -1 !== ["JPY"].indexOf(e) ? n = 100 * Math.ceil(n / 100) : -1 !== ["EUR"].indexOf(e) && (n = Math.ceil(n) - .05)), n)
                        }
                    }
                },
                h = !1;
            !0 === m.nav.isQueryParameterSet("botdebug") && (h = !0);
            var f = function() {
                function t(n, t) {
                    for (; n && 1 === n.nodeType;) {
                        if (n.matches(t)) return n;
                        n = n.parentNode
                    }
                    return null
                }
                canPreventCheckout = !0;
                var e = !1;

                function a(t, e) {
                    void 0 === e && (e = !1);
                    var i = null;
                    if (void 0 !== t) i = t.closest("form, .icartShopifyCartContent");
                    !1 === e && (T = function() {
                        a(t, !0)
                    });
                    m.cart.get(!1).then((function(t) {
                        return t.clone().json().then((function(t) {
                            var e = function(n, t) {
                                var e = [],
                                    i = !1;
                                try {
                                    var a = /\d+:[a-z0-9]+/,
                                        l = document;
                                    null !== t && (l = t);
                                    var r = l.querySelectorAll('[name="updates[]"]');
                                    if (r.length > 0)
                                        for (var o = 0; o < r.length; o++) {
                                            var _ = r[o],
                                                d = _.id;
                                            if ("string" == typeof d) {
                                                var s = d.match(a);
                                                if (null !== s && "string" == typeof s[0]) {
                                                    var c = s[0];
                                                    if ((p = 1 * _.value) >= 0) {
                                                        for (var u = 0; u < n.items.length; u++) n.items[u].key === c && n.items[u].quantity != p && e.push({
                                                            key: n.items[u].key,
                                                            id: n.items[u].id,
                                                            quantity: p
                                                        });
                                                        i = !0
                                                    }
                                                }
                                            }
                                            if (!1 === i && r.length === n.items.length) {
                                                var p, g = _.dataset.index;
                                                if (void 0 === g) var y = o + 1;
                                                else y = g;
                                                if (("string" == typeof y || "number" == typeof y) && (y *= 1) > 0 && (p = 1 * _.value) >= 0)
                                                    for (u = 0; u < n.items.length; u++) u + 1 === y && n.items[u].quantity != p && e.push({
                                                        key: n.items[u].key,
                                                        id: n.items[u].id,
                                                        quantity: p
                                                    })
                                            }
                                        }
                                } catch (n) {
                                    console.error(n)
                                }
                                return e
                            }(t, i);
                            if (!(e.length > 0)) return changesWereMadeToTheCart = !1, d(!1, !1, "");
                            if (!1 === changesWereMadeToTheCart) {
                                var a = function(n, t) {
                                    var e = !1;
                                    try {
                                        var i = /\d+:[a-z0-9]+/,
                                            a = document;
                                        null !== t && (a = t);
                                        var l = a.querySelectorAll('[name="updates[]"]');
                                        if (l.length > 0)
                                            for (var r = 0; r < l.length; r++) {
                                                var o = l[r],
                                                    _ = o.id;
                                                if ("string" == typeof _) {
                                                    var d = _.match(i);
                                                    if (null !== d && "string" == typeof d[0]) {
                                                        var s = d[0];
                                                        if ((u = 1 * o.value) >= 0) {
                                                            for (var c = 0; c < n.items.length; c++) n.items[c].key === s && n.items[c].quantity != u && (n.items[c].quantity = u, n.items[c].line_price = u * n.items[c].price, n.items[c].original_line_price = u * n.items[c].original_price, n.items[c].final_line_price = u * n.items[c].final_price);
                                                            e = !0
                                                        }
                                                    }
                                                }
                                                if (!1 === e && l.length === n.items.length) {
                                                    var u;
                                                    if (void 0 === o.dataset.index) var p = r + 1;
                                                    if (("string" == typeof p || "number" == typeof p) && (p *= 1) > 0 && (u = 1 * o.value) >= 0)
                                                        for (c = 0; c < n.items.length; c++) c + 1 === p && n.items[c].quantity != u && (n.items[c].quantity = u, n.items[c].line_price = u * n.items[c].price, n.items[c].original_line_price = u * n.items[c].original_price, n.items[c].final_line_price = u * n.items[c].final_price)
                                                }
                                            }
                                    } catch (n) {
                                        console.error(n)
                                    }
                                    return {
                                        cartData: n,
                                        quantityWasFixed: e
                                    }
                                }(t, i);
                                t = a.cartData, m.cart.cartData = t
                            }
                            var l = q(void 0, !1, "");
                            return l.add.length > 0 || l.remove.length > 0 ? async function(t, e) {
                                void 0 === e && (e = !0);
                                var i = function(n) {
                                    for (var t = {}, e = 0; e < n.length; e++) void 0 !== n[e].key ? t[n[e].key] = n[e].quantity : void 0 !== n[e].id && (t[n[e].id] = n[e].quantity);
                                    return t
                                }(t);
                                if (!0 === I) return console.log("Already adding to the cart"), null;
                                if (I = !0, !1 === n.hasSpace()) return console.log("leaky bucket is full"), null;
                                n.add();
                                var a = ".js",
                                    l = "",
                                    r = "/";
                                void 0 !== window.Shopify && void 0 !== window.Shopify.routes && "string" == typeof window.Shopify.routes.root && (r = window.Shopify.routes.root);
                                return await fetch(r + "cart/update" + a + "?cartbot-cart-call&" + l, {
                                    method: "POST",
                                    cache: "no-cache",
                                    credentials: "same-origin",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    redirect: "follow",
                                    referrerPolicy: "no-referrer",
                                    body: JSON.stringify({
                                        updates: i
                                    })
                                }).then((function(n) {
                                    if (I = !1, e && (void 0 === n.status || 200 !== n.status)) throw new Error("Cartbot: Couldnt add the product to the cart automatically. Please recreate your bot or check that the product you are trying to add exists and has the correct selling plan selected (if needed). " + n.status);
                                    "function" == typeof T && T()
                                })).catch((function(n) {
                                    return I = !1, "function" == typeof T && T(), null
                                }))
                            }(e).then((function(n) {
                                return d(!1, !1, "")
                            })): void 0
                        }))
                    })).then((function(n) {
                        l()
                    }))
                }

                function l() {
                    if (void 0 !== window.bndlr && "function" == typeof bndlr.canUseCheckout && "function" == typeof bndlr.checkout && !0 === bndlr.canUseCheckout()) return bndlr.checkout(), !0;
                    var n = !1;
                    try {
                        void 0 !== window.gokwikSdk && void 0 !== window.gokwikSdk.initCheckout && void 0 !== window.merchantInfo && (window.gokwikSdk.initCheckout(window.merchantInfo), n = !0)
                    } catch (n) {
                        console.error(n)
                    }
                    if (!1 === n) {
                        var t = document.querySelector(".cartbot-checkout-button-clicked");
                        if (null !== t && !1 === changesWereMadeToTheCart) {
                            canPreventCheckout = !1, t.click(), canPreventCheckout = !0;
                            var e = !0;
                            void 0 !== window.sendicaPickupPoints && void 0 !== window.sendicaPickupPoints.controllingCheckout && !0 === window.sendicaPickupPoints.controllingCheckout && (e = !1), !0 === e && setTimeout((function() {
                                window.location.href = "/checkout"
                            }), 4e3)
                        } else window.location.href = "/checkout"
                    }
                }

                function r(n, t) {
                    return m.cart.get(!1).then((function(e) {
                        return d(!0, n, t)
                    }))
                }

                function o() {
                    return h && console.log("== refreshing local cart =="), m.cart.get(!1)
                }

                function d(n, t, e) {
                    void 0 === e && (e = "");
                    var i = q(void 0, t, e),
                        a = JSON.parse(JSON.stringify(i.remove));
                    return i.add.length > 0 ? (changesWereMadeToTheCart = !0, k(i.add).then((function(t) {
                        a.length > 0 ? E(a).then((function(t) {
                            n && m.nav.isCartPage() && m.nav.reload()
                        })) : n && m.nav.isCartPage() && null !== t && (console.log("reloading the cart page"), m.nav.reload())
                    }))) : i.remove.length > 0 ? (changesWereMadeToTheCart = !0, E(i.remove).then((function(t) {
                        n && m.nav.isCartPage() && m.nav.reload()
                    }))) : new Promise(((n, t) => {
                        n(new Response("", {
                            status: 200,
                            statusText: "Fallback promise."
                        }))
                    }))
                }

                function s(arguments, n) {
                    void 0 === n && (n = !1);
                    var t = arguments[0],
                        e = arguments[1],
                        i = p(t, "add"),
                        a = p(t, "change"),
                        l = {};
                    if (i || n && a)
                        if (null !== e && "object" == typeof e && "object" == typeof e.body)
                            for (var r of e.body.entries()) l[r[0]] = r[1];
                        else if ("object" == typeof e && "string" == typeof e.body && void 0 !== e.headers && "string" == typeof e.headers["Content-Type"] && -1 !== e.headers["Content-Type"].indexOf("application/json")) try {
                        l = JSON.parse(e.body)
                    } catch (n) {} else if ("object" == typeof e && "string" == typeof e.body && void 0 !== e.headers && "string" == typeof e.headers["content-type"] && -1 !== e.headers["content-type"].indexOf("application/json")) try {
                            l = JSON.parse(e.body)
                        } catch (n) {} else if ("object" == typeof e && "string" == typeof e.body) l = m.nav.getQueryParams(e.body);
                        else if ("object" == typeof e && void 0 === e.body) try {
                        for (var r of e.entries()) l[r[0]] = r[1]
                    } catch (n) {
                        console.log(n)
                    } else if ("string" == typeof e) {
                        try {
                            l = JSON.parse(e)
                        } catch (n) {}
                        if (0 === Object.keys(l).length) try {
                            l = m.nav.getQueryParams(e)
                        } catch (n) {}
                    } if (void 0 !== l.line && void 0 === l.id) {
                        var o = JSON.parse(JSON.stringify(m.cart.cartData)),
                            _ = 1 * l.line;
                        _ -= 1, void 0 !== o.items && void 0 !== o.items[_] && (l.id = o.items[_].id, l.key = o.items[_].key)
                    }
                    if (void 0 !== l.items && void 0 !== l.items[0]) {
                        var d = l.items;
                        (l = l.items[0]).items = d
                    }
                    if (void 0 !== l.updates && Object.keys(l.updates).length > 0) {
                        d = [];
                        for (var s in l.updates) l.updates.hasOwnProperty(s) && d.push({
                            id: s,
                            quantity: l.updates[s]
                        });
                        (l = d[0]).items = d
                    }
                    if (void 0 !== l["id[]"] && (l.id = l["id[]"]), void 0 !== l["items[0][id]"] && (l.id = l["items[0][id]"]), void 0 !== l["items[0][quantity]"] && (l.quantity = l["items[0][quantity]"]), void 0 !== l["items[0][selling_plan]"] && (l.selling_plan = l["items[0][selling_plan]"]), "string" == typeof l.id && -1 !== l.id.indexOf(":")) {
                        var c = l.id.split(":");
                        "string" == typeof c[0] && c[0].length > 0 && (l.id = c[0])
                    }
                    if (void 0 === l.id && void 0 !== l["items[1]id"] && (l.id = l["items[1]id"]), void 0 !== l.id) {
                        var u = 1;
                        void 0 !== l.quantity && (u = l.quantity);
                        var g = "";
                        void 0 !== l.selling_plan && (g = l.selling_plan);
                        var y = [];
                        if (void 0 !== l.items && l.items.length > 1)
                            for (var h = 0; h < l.items.length; h++) {
                                var f = l.items[h];
                                if (void 0 !== f.id) {
                                    var v = 1;
                                    void 0 !== f.quantity && (v = f.quantity);
                                    var w = "";
                                    void 0 !== f.selling_plan && (w = f.selling_plan);
                                    var q = {
                                        id: f.id,
                                        quantity: v,
                                        selling_plan: w
                                    };
                                    y.push(q)
                                }
                            }
                        if (0 === y.length) {
                            var O = !0;
                            for (h = 0; O;) {
                                if (void 0 === l["items[" + h + "][id]"]) O = !1;
                                else {
                                    var A = l["items[" + h + "][id]"];
                                    v = 1;
                                    void 0 !== l["items[" + h + "][quantity]"] && (v = l["items[" + h + "][quantity]"]);
                                    w = "";
                                    void 0 !== l["items[" + h + "][selling_plan]"] && (w = l["items[" + h + "][selling_plan]"]);
                                    q = {
                                        id: A,
                                        quantity: v,
                                        selling_plan: w
                                    };
                                    y.push(q)
                                }
                                h++
                            }
                        }
                        return "" !== l.id && (1 * l.id + "" == l.id + "" && {
                            id: l.id,
                            quantity: u,
                            selling_plan: g,
                            other_items: y,
                            number_of_line_in_cart: l.line
                        })
                    }
                    return !1
                }

                function u(arguments) {
                    var n = arguments[0],
                        t = ["/cart/"],
                        e = ["cartbot-cart-call", "bundler-cart-call"],
                        i = !1;
                    if ("string" == typeof n)
                        for (var a = 0; a < t.length; a++)
                            if (-1 !== n.indexOf(t[a])) {
                                for (var l = !1, r = 0; r < e.length; r++) - 1 !== n.indexOf(e[r]) && (l = !0);
                                !1 === l && (i = !0, a = t.length)
                            } return i
                }

                function p(n, t) {
                    var e = {
                        add: ["/cart/add.js", "/cart/add.json", "/cart/add"],
                        change: ["/cart/change.js", "/cart/change.json", "/cart/change", "/cart/update.js", "/cart/update.json"],
                        clear: ["/cart/clear.js", "/cart/clear.json", "/cart/clear"]
                    };
                    if (e.change.push("/cart/update"), void 0 === e[t]) return !1;
                    var i = ["cartbot-cart-call"];
                    "change" === t && i.push("bundler-cart-call");
                    var a = e[t],
                        l = !1;
                    if ("string" == typeof n)
                        for (var r = 0; r < a.length; r++)
                            if (-1 !== n.indexOf(a[r])) {
                                for (var o = !1, _ = 0; _ < i.length; _++) - 1 !== n.indexOf(i[_]) && (o = !0);
                                !1 === o && (l = !0, r = a.length)
                            } return l
                }

                function g(n) {
                    try {
                        JSON.parse(n)
                    } catch (n) {
                        return !1
                    }
                    return !0
                }

                function f(n, t, e) {
                    var i = [];
                    i.push(n);
                    for (let n = 0; n < t.length; n++) t[n].id !== e && i.push(t[n]);
                    return n = {
                        items: i
                    }
                }

                function v(n, t, e) {
                    var i = {
                        add: [],
                        remove: []
                    };
                    if (void 0 !== n.other_items && n.other_items.length > 1) {
                        var a = q(n.other_items[0], t, e, n.other_items);
                        void 0 !== a.add && a.add.length > 0 && (i.add = i.add.concat(a.add)), void 0 !== a.remove && a.remove.length > 0 && (i.remove = i.remove.concat(a.remove))
                    } else i = q(n, t, e);
                    return i
                }

                function q(n, t, e, a) {
                    if (h && (console.log("---- getActions ----"), console.trace()), void 0 === t && (t = !1), void 0 === a && (a = []), void 0 !== window.completelyDisableCartbotApp && !0 === window.completelyDisableCartbotApp) return console.log("Cartbot app was disabled by the completelyDisableCartbotApp variable"), {
                        add: [],
                        remove: []
                    };
                    void 0 === e && (e = "");
                    var l = JSON.parse(JSON.stringify(m.cart.cartData));
                    JSON.parse(JSON.stringify(l));
                    h && console.log("cart in getActions", JSON.parse(JSON.stringify(l)));
                    var r = [];
                    if (a.length <= 1 && (a = [n]), void 0 !== a && a.length > 0)
                        for (var o = 0; a.length > o; o++) {
                            var _ = a[o];
                            if (null != _) {
                                var d = !1;
                                if (null !== l && void 0 !== l.items && l.items.length > 0)
                                    for (var s = 0; s < l.items.length; s++) {
                                        var c = "";
                                        void 0 !== l.items[s].selling_plan_allocation && (c = l.items[s].selling_plan_allocation.selling_plan.id);
                                        var u = "";
                                        void 0 !== _.selling_plan && (u = _.selling_plan);
                                        var p = !1;
                                        1 * l.items[s].id != 1 * _.id && l.items[s].key !== _.id || (p = !0), "string" == typeof l.items[s].key && 0 === l.items[s].key.indexOf(_.id + ":") && (p = !0), !0 === p && (c + "" == u + "" || 1 * _.quantity == 0 && "change" === e) && (l.items[s].quantity = "change" === e ? 1 * _.quantity : 1 * l.items[s].quantity + 1 * _.quantity, d = !0, s = l.items.length)
                                    }
                                if (!1 === d && "change" !== e) {
                                    var g = {
                                        id: 1 * _.id,
                                        quantity: 1 * _.quantity,
                                        key: 1 * _.id
                                    };
                                    void 0 !== _.selling_plan && null !== _.selling_plan && (g.selling_plan_allocation = {
                                        selling_plan: {
                                            id: _.selling_plan
                                        }
                                    }), l.items.push(g)
                                }
                                void 0 !== _.quantity && _.quantity
                            }
                        }
                    var f = 0;
                    if (null != l && void 0 !== l.items && null !== l.items && l.items.length > 0)
                        for (s = 0; s < l.items.length; s++) void 0 !== l.items[s].line_price && void 0 !== l.items[s].quantity && l.items[s].quantity > 0 && (f += l.items[s].line_price);
                    f /= 100, h && console.log("totalCartValue", f);
                    for (var v = [], w = [], q = 0; q < i.length; q++)
                        for (var O = i[q], A = !0, C = 0; A && C < 1e4;) {
                            A = !1, C++;
                            var b = JSON.parse(JSON.stringify(l)),
                                S = !0,
                                I = "true" !== O.must_include_any_variant,
                                T = "true" === O.works_in_reverse;
                            "n_products" !== O.condition_type && "n_products_and_cart_value" !== O.condition_type || (I = !1);
                            var k = !1,
                                D = [],
                                E = !1;
                            if ("true" === O.ask_for_confirmation) try {
                                var N = m.sessionStorage.get("blocked_confirmation_bots");
                                null !== N && void 0 !== N["_" + O.id] && (E = !0, S = !1)
                            } catch (n) {
                                console.error("cartbot", n)
                            }
                            if ("true" === O.apply_once_per_session && !0 !== t) try {
                                "" !== (Z = m.cookie.get("applied_rules")) && (Z = JSON.parse(Z)), void 0 !== Z["_" + O.id] && (E = !0, S = !1)
                            } catch (n) {
                                console.error("cartbot", n)
                            }
                            if ("products" === O.condition_type || "n_products" === O.condition_type || "cart_value_and_products" === O.condition_type || "n_products_and_cart_value" === O.condition_type) {
                                var R = [];
                                if (O.product_variants_contain.length > 0) {
                                    for (var P = 0, L = 0, j = 0, x = 0; x < O.product_variants_contain.length; x++)
                                        for (var J = O.product_variants_contain[x], B = 0, G = (JSON.parse(JSON.stringify(D)), JSON.parse(JSON.stringify(l.items)), 0); G < l.items.length; G++) {
                                            c = "";
                                            if (void 0 !== (g = l.items[G]).selling_plan_allocation && (c = g.selling_plan_allocation.selling_plan.id + ""), 1 * J.variant_id == 1 * g.id && g.quantity > 0 && B < J.quantity && (J.selling_plan_id + "" === c || "one_time_or_any" === J.selling_plan_id || "any" === J.selling_plan_id && "" !== c))
                                                if ("n_products" === O.condition_type || "n_products_and_cart_value" === O.condition_type) {
                                                    var H = null;
                                                    "true" === O.products_max_enable ? (H = 1 * O.products_max, H -= L) : H = 99999999;
                                                    var U = g.quantity;
                                                    U > H && (U = H), P++, L += U, j += U, g.quantity = g.quantity - U, "n_products_and_cart_value" === O.condition_type && (B = U), h && console.log("Reducing quantity of item " + g.id + " for quantity of " + U + " because of " + O.name + " rule"), D.push({
                                                        id: J.variant_id,
                                                        quantity: U,
                                                        line_key: g.key
                                                    })
                                                } else {
                                                    var M = g.quantity;
                                                    M > J.quantity && (M = J.quantity), g.quantity = g.quantity - M, (B += M) === J.quantity && P++, h && console.log("Reducing quantity of item " + g.id + " for quantity of " + M + " because of " + O.name + " rule", g.quantity), D.push({
                                                        id: J.variant_id,
                                                        quantity: J.quantity,
                                                        line_key: g.key
                                                    })
                                                }
                                            else 1 * J.variant_id == 1 * g.id && (g.quantity <= 0 && R.push("Item " + g.id + " doesnt have enough quantity: " + g.quantity), B >= J.quantity && R.push("We applied more quantity already than what is required for " + 1 * J.variant_id + ". Applied quantity: " + B), J.selling_plan_id + "" !== c && "one_time_or_any" !== J.selling_plan_id && "any" === J.selling_plan_id && "" !== c && R.push("Selling plan doesnt match " + 1 * J.variant_id + ". Selling plan: " + c), h && console.log("reasons", R));
                                            !0 === I ? P === O.product_variants_contain.length && (G = l.items.length) : "n_products" === O.condition_type || "n_products_and_cart_value" === O.condition_type ? "true" === O.products_max_enable && L >= 1 * O.products_max ? (G = l.items.length, h && console.log("Stopping the loop")) : h && console.log("NOT stopping the loop") : P > 0 ? (G = l.items.length, h && console.log("Stopping the loop"), "false" === O.apply_once_per_cart && (x = O.product_variants_contain.length)) : h && console.log("NOT stopping the loop")
                                        }!0 === I ? (S = P === O.product_variants_contain.length, "cart_value_and_products" === O.condition_type && (y = !0 === S)) : "n_products" === O.condition_type || "n_products_and_cart_value" === O.condition_type ? (S = L >= 1 * O.products_min, "true" === O.products_max_enable && j > 1 * O.products_max && (S = !1)) : "cart_value_and_products" === O.condition_type ? y = P > 0 : S = P > 0
                                }
                            } else if ("cart_value" === O.condition_type) {
                                S = !1;
                                var F = f;
                                "true" === O.cart_value_max_enable ? 1 * O.cart_value_min <= F && 1 * O.cart_value_max >= F && (S = !0) : 1 * O.cart_value_min <= F && (S = !0)
                            }
                            if ("cart_value_and_products" === O.condition_type) {
                                let n = !1,
                                    t = y;
                                if (S = !1, "true" === O.restrict_amount_to_products_included) {
                                    var Q = {};
                                    f = 0;
                                    for (let n = 0; n < O.product_variants_contain.length; n++)
                                        for (let t = 0; t < l.items.length; t++) void 0 === Q[l.items[t].variant_id + "_" + t] && l.items[t].variant_id + "" == O.product_variants_contain[n].variant_id + "" && (f += l.items[t].line_price, Q[l.items[t].variant_id + "_" + t] = !0);
                                    f /= 100
                                }
                                "true" === O.cart_value_max_enable ? 1 * O.cart_value_min <= f && 1 * O.cart_value_max >= f && (n = !0) : 1 * O.cart_value_min <= f && (n = !0), S = !0 === n && !0 === t
                            }
                            if ("n_products_and_cart_value" === O.condition_type) {
                                let n = !1;
                                S = !1, "true" === O.cart_value_max_enable ? n = f >= 1 * O.cart_value_min && f <= 1 * O.cart_value_max : f >= 1 * O.cart_value_min && (n = !0), !0 === n && (S = L >= 1 * O.products_min)
                            }
                            if (h && console.log("canAddItems", S), S) {
                                if ("true" === O.apply_only_on_add_to_cart && "add" !== e) {
                                    A = !1;
                                    continue
                                }
                                if (O.product_variants_add.length > 0) {
                                    for (x = 0; x < O.product_variants_add.length; x++) {
                                        var W = (tn = O.product_variants_add[x]).quantity,
                                            $ = !1;
                                        if ("add" !== e || "true" === O.apply_once_per_cart || "false" === O.remove_the_initial_variants)
                                            for (G = 0; G < l.items.length; G++) {
                                                c = "";
                                                if (void 0 !== (g = l.items[G]).selling_plan_allocation && (c = g.selling_plan_allocation.selling_plan.id), 1 * tn.variant_id == 1 * g.id && g.quantity > 0 && c + "" == tn.selling_plan_id + "") {
                                                    var K = !0;
                                                    if ("true" === O.add_products_even_if_already_in_the_cart && (K = !1, void 0 !== g.properties && void 0 !== g.properties._added_by_cartbot && (K = !0)), !0 === K) {
                                                        var V = g.quantity;
                                                        if (V > tn.quantity && (V = tn.quantity), W < V && (V = W), "true" === O.remove_the_initial_variants && "false" === O.apply_once_per_cart || (W -= V) < 0 && (W = 0), $ = !0, g.quantity = g.quantity - V, h && (console.log("Subtracting quantity of item " + g.id + " for quantity of " + V + " because of " + O.name + " rule"), console.log("New quantity " + g.quantity)), "true" === O.apply_once_per_cart && g.quantity > 0 && T && "cart_value" !== O.condition_type) {
                                                            var z = JSON.parse(JSON.stringify(O));
                                                            r.push(z), A = !1
                                                        }
                                                        if ("true" === O.apply_once_per_cart && g.quantity > 0 && T && "cart_value" === O.condition_type) {
                                                            z = JSON.parse(JSON.stringify(O));
                                                            r.push(z), A = !1
                                                        }
                                                    }
                                                }
                                            }!1 === $ || !0 === $ && W > 0 ? (!1 === E && (v.push({
                                                id: tn.variant_id,
                                                quantity: W,
                                                selling_plan: tn.selling_plan_id,
                                                rule_id: O.id,
                                                product_id: tn.product_id
                                            }), k = !0), h && (console.log("Adding variant " + tn.variant_id + " to the cart with quantity of " + W + " because of " + O.name + " rule."), console.log("variantsToAdd", JSON.parse(JSON.stringify(v)), v)), "false" === O.apply_once_per_cart && "cart_value" !== O.condition_type && (A = !0)) : ("false" === O.apply_once_per_cart && "cart_value" !== O.condition_type && (A = !0), D.length > 0 && "true" === O.remove_the_initial_variants && "false" === O.apply_once_per_cart && (k = !0))
                                    }
                                    if ("true" === O.apply_once_per_session && !0 === k && !0 !== t) try {
                                        var Z;
                                        (Z = "" !== (Z = m.cookie.get("applied_rules")) ? JSON.parse(Z) : {})["_" + O.id] = O.id, m.cookie.set("applied_rules", JSON.stringify(Z), 0)
                                    } catch (n) {}
                                }
                            } else l = JSON.parse(JSON.stringify(b)), T && (h && console.log("Adding rule in for removal", JSON.parse(JSON.stringify(O)), JSON.parse(JSON.stringify(b))), r.push(JSON.parse(JSON.stringify(O))));
                            "true" === O.remove_the_initial_variants && !0 === k && (w = w.concat(JSON.parse(JSON.stringify(D)))), D = []
                        }
                    if (h && console.log("rulesForRemoval", JSON.parse(JSON.stringify(r))), r.length > 0)
                        for (var X = 0; X < r.length; X++) {
                            O = r[X];
                            var Y = [],
                                nn = l;
                            for (x = 0; x < O.product_variants_add.length; x++) {
                                var tn = O.product_variants_add[x];
                                for (G = 0; G < nn.items.length; G++) {
                                    c = "";
                                    if (void 0 !== (g = nn.items[G]).selling_plan_allocation && (c = g.selling_plan_allocation.selling_plan.id + ""), 1 * tn.variant_id == 1 * g.id && g.quantity > 0 && tn.selling_plan_id + "" === c) {
                                        G = nn.items.length;
                                        var en = 1 * tn.quantity;
                                        "cart_value" === O.condition_type && g.quantity > 1 * tn.quantity && (en = g.quantity), "true" === O.works_in_reverse && (en = g.quantity), Y.push({
                                            id: tn.variant_id,
                                            quantity: 1 * en,
                                            line_key: g.key
                                        }), g.quantity -= 1 * en, h && (console.log("Removing variant " + tn.variant_id + " for quantity of " + en + " because of " + O.name + " rule"), console.log("Current quantity " + g.quantity + ". Item id " + g.id), console.log(JSON.parse(JSON.stringify(nn))))
                                    }
                                }
                            }
                            w = w.concat(JSON.parse(JSON.stringify(Y)))
                        }
                    return h && console.log({
                        add: JSON.parse(JSON.stringify(v)),
                        remove: JSON.parse(JSON.stringify(w))
                    }), {
                        add: v,
                        remove: w
                    }
                }

                function O() {
                    if ("function" == typeof window.SLIDECART_UPDATE) try {
                        window.SLIDECART_UPDATE()
                    } catch (n) {}
                    if (void 0 !== window.theme && void 0 !== window.theme.ajaxCart && "function" == typeof window.theme.ajaxCart.update) try {
                        window.theme.ajaxCart.update()
                    } catch (n) {}
                    if ("function" == typeof window.icartCartActivityEvent) try {
                        window.icartCartActivityEvent()
                    } catch (n) {}
                    try {
                        document.dispatchEvent(new CustomEvent("cart:refresh", {
                            detail: {
                                open: !0
                            }
                        }))
                    } catch (n) {}
                    try {
                        document.documentElement.dispatchEvent(new CustomEvent("cart:refresh", {
                            bubbles: !0,
                            detail: {
                                open: !0
                            }
                        }))
                    } catch (n) {}
                    try {
                        document.dispatchEvent(new CustomEvent("product:added", {
                            detail: {
                                quantity: 1
                            },
                            bubbles: !0
                        }))
                    } catch (n) {}
                    if (void 0 !== window.HsCartDrawer && "function" == typeof window.HsCartDrawer.updateSlideCart && c("hscartdrawer", (function() {
                            try {
                                HsCartDrawer.updateSlideCart()
                            } catch (n) {
                                console.log(n)
                            }
                        }), 100), void 0 !== window.Hs_CartDrawer && "function" == typeof window.Hs_CartDrawer.updateSlideCart && c("hscartdrawer", (function() {
                            try {
                                Hs_CartDrawer.updateSlideCart()
                            } catch (n) {
                                console.log(n)
                            }
                        }), 100), void 0 !== window.HS_SLIDE_CART_OPEN && "function" == typeof window.HS_SLIDE_CART_OPEN && c("hscartdraweropen", (function() {
                            try {
                                window.HS_SLIDE_CART_OPEN()
                            } catch (n) {
                                bundlerConsole.log(n)
                            }
                        }), 100), "undefined" != typeof theme && void 0 !== theme.Cart && "function" == typeof theme.Cart.updateCart) try {
                        theme.Cart.updateCart()
                    } catch (n) {}
                    if ("function" == typeof window.updateMiniCartContents) try {
                        window.updateMiniCartContents()
                    } catch (n) {}
                    if ("function" == typeof window.loadEgCartDrawer) try {
                        window.loadEgCartDrawer()
                    } catch (n) {}
                    try {
                        document.dispatchEvent(new CustomEvent("cart:build"))
                    } catch (n) {}
                    try {
                        document.dispatchEvent(new CustomEvent("obsidian:upsell:refresh")), document.dispatchEvent(new CustomEvent("obsidian:upsell:open"))
                    } catch (n) {}
                    var n = document.getElementById("site-cart");
                    if (null !== n) try {
                        n.show()
                    } catch (n) {}
                    if ("undefined" != typeof CartJS && "function" == typeof CartJS.getCart) try {
                        CartJS.getCart()
                    } catch (n) {
                        console.log(n)
                    }
                    if (void 0 !== window.SLIDECART_UPDATE) try {
                        window.SLIDECART_UPDATE()
                    } catch (n) {
                        bundlerConsole.log(n)
                    }
                    if (void 0 !== window.SLIDECART_OPEN && setTimeout((function() {
                            try {
                                window.SLIDECART_OPEN()
                            } catch (n) {
                                bundlerConsole.log(n)
                            }
                        }), 500), "undefined" != typeof Shopify && void 0 !== Shopify.theme && void 0 !== Shopify.theme.jsAjaxCart && "function" == typeof Shopify.theme.jsAjaxCart.updateView) try {
                        Shopify.theme.jsAjaxCart.updateView()
                    } catch (n) {}
                    if ("undefined" != typeof Shopify && void 0 !== Shopify.theme && void 0 !== Shopify.theme.ajaxCart && "function" == typeof Shopify.theme.ajaxCart.updateView) try {
                        m.cart.get(!1).then((function(n) {
                            n.clone().json().then((function(n) {
                                Shopify.theme.ajaxCart.updateView({
                                    cart_url: window.location.origin + "/cart"
                                }, n)
                            }))
                        }))
                    } catch (n) {}
                    if (void 0 !== window.theme && void 0 !== window.theme.MiniCart && "function" == typeof window.theme.MiniCart.update) try {
                        theme.MiniCart.update()
                    } catch (n) {}
                    if (void 0 !== window.ajaxCart && "function" == typeof window.ajaxCart.load) try {
                        window.ajaxCart.load()
                    } catch (n) {}
                    if (void 0 !== window.cart && "function" == typeof window.cart.getCart) try {
                        window.cart.getCart()
                    } catch (n) {}
                    if (void 0 !== window.geckoShopify && "function" == typeof window.geckoShopify.onCartUpdate) try {
                        window.geckoShopify.onCartUpdate(1, 1, 19041994)
                    } catch (n) {}
                    if (void 0 !== window.Shopify && "function" == typeof window.Shopify.KT_onItemAdded) try {
                        window.Shopify.KT_onItemAdded()
                    } catch (n) {}
                    if ("function" == typeof window.flatRefreshCartCallback) try {
                        window.flatRefreshCartCallback()
                    } catch (n) {}
                    try {
                        (t = document.querySelectorAll("html")[0]._x_dataStack[0]).updateCart(!0)
                    } catch (n) {}
                    try {
                        document.dispatchEvent(new CustomEvent("product:added", {
                            detail: {
                                quantity: 0
                            }
                        }))
                    } catch (n) {}
                    try {
                        void 0 !== window.Alpine && window.Alpine.store("main").fetchCart()
                    } catch (n) {}
                    try {
                        void 0 !== window.Alpine && Alpine.store("xMiniCart").reLoad()
                    } catch (n) {}
                    try {
                        void 0 !== window.Hs_CartDrawer && "function" == typeof window.Hs_CartDrawer.updateSlideCart && window.Hs_CartDrawer.updateSlideCart()
                    } catch (n) {}
                    try {
                        "function" == typeof window.updateCartDrawer && window.updateCartDrawer()
                    } catch (n) {}
                    try {
                        void 0 !== window.PXUTheme && void 0 !== window.PXUTheme.jsAjaxCart && "function" == typeof window.PXUTheme.jsAjaxCart.updateView && window.PXUTheme.jsAjaxCart.updateView()
                    } catch (n) {}
                    try {
                        void 0 !== window.theme && void 0 !== window.theme.miniCart && "function" == typeof window.theme.miniCart.updateElements && window.theme.miniCart.updateElements()
                    } catch (n) {}
                    try {
                        void 0 !== window.liquidAjaxCart && "function" == typeof window.liquidAjaxCart.update && window.liquidAjaxCart.update()
                    } catch (n) {}
                    try {
                        void 0 !== window.theme && void 0 !== window.theme.miniCart && "function" == typeof window.theme.miniCart.generateCart && window.theme.miniCart.generateCart()
                    } catch (n) {}
                    try {
                        var t;
                        null !== (t = document.querySelector("#ajax-cart")) && "function" == typeof t.getCartData && t.getCartData()
                    } catch (n) {}
                    try {
                        "undefined" != typeof HELPER_UTIL && "undefined" != typeof _EVENT_HELPER && HELPER_UTIL.dispatchCustomEvent(_EVENT_HELPER.updateAndShowCart)
                    } catch (n) {}
                    try {
                        window.dispatchEvent(new Event("cart:updated"))
                    } catch (n) {}
                    try {
                        "function" == typeof window.opusRefreshCart && window?.opusRefreshCart(), "function" == typeof window.opusOpen && window?.opusOpen()
                    } catch (n) {}
                    setTimeout((function() {
                        try {
                            document.documentElement.dispatchEvent(new CustomEvent("cart:refresh", {
                                bubbles: !0,
                                detail: {
                                    open: !0
                                }
                            }))
                        } catch (n) {
                            console.log(n)
                        }
                    }), 2e3), void 0 !== window.cart && "function" == typeof window.cart.getCart && (setTimeout((function() {
                        try {
                            window.cart.getCart()
                        } catch (n) {
                            console.log(n)
                        }
                    }), 1e3), setTimeout((function() {
                        try {
                            window.cart.getCart()
                        } catch (n) {
                            console.log(n)
                        }
                    }), 2e3), setTimeout((function() {
                        try {
                            window.cart.getCart()
                        } catch (n) {
                            console.log(n)
                        }
                    }), 5e3), setTimeout((function() {
                        try {
                            window.cart.getCart()
                        } catch (n) {
                            console.log(n)
                        }
                    }), 1e4));
                    try {
                        m.cart.get(!1).then((function(n) {
                            n.clone().json().then((function(n) {
                                document.dispatchEvent(new CustomEvent("theme:cart:reload"));
                                var t = document.querySelector('#cart-icon-bubble .cart-count-bubble span[aria-hidden="true"]');
                                null !== t && (t.innerHTML = n.item_count);
                                var e = document.querySelector("#cart-notification-button");
                                null !== e && (e.innerHTML = e.innerHTML.replace(/\d+/, n.item_count));
                                var i = document.querySelector(".cart-link__count");
                                if (null !== i && (n.item_count > 0 ? i.innerHTML = n.item_count : i.innerHTML = ""), void 0 !== n.items && 0 === n.items.length) {
                                    var a = document.querySelector("cart-drawer.drawer");
                                    null !== a && a.classList.add("is-empty")
                                }
                                void 0 !== window.halo && void 0 !== window.halo.updateSidebarCart && window.halo.updateSidebarCart(n);
                                try {
                                    if (void 0 !== window.theme && void 0 !== window.theme.cart && void 0 !== window.theme.cart.store && "function" == typeof window.theme.cart.store.getState) {
                                        var l = window.theme.cart.store.getState();
                                        "function" == typeof l.updateNote && l.updateNote(n.note)
                                    }
                                } catch (n) {
                                    console.log(n)
                                }
                            }))
                        }))
                    } catch (n) {
                        console.error(n)
                    }
                    try {
                        m.cart.get(!1).then((function(n) {
                            n.clone().json().then((function(n) {
                                if (void 0 !== n.item_count) {
                                    var t = n.item_count,
                                        e = document.querySelector("cart-count");
                                    null !== e && (e.innerHTML = t);
                                    var i = document.querySelector(".satcb-cs-header-title .satcb-cs-header-count");
                                    null !== i && (i.innerHTML = t);
                                    var a = document.querySelector("#CartCount [data-cart-count]");
                                    null !== a && (a.innerHTML = t)
                                }
                                "undefined" != typeof window && void 0 !== window.wetheme && void 0 !== window.wetheme.updateCartDrawer && window.wetheme.updateCartDrawer(n)
                            }))
                        }))
                    } catch (n) {}
                    try {
                        var e = document.querySelector("cart-notification") || document.querySelector("cart-drawer mini-cart") || document.querySelector("cart-drawer") || document.querySelector("product-form.product-form") || document.querySelector("#mini-cart") || document.querySelector("sht-cart-drwr-frm");
                        if (null !== e && "function" == typeof e.renderContents) {
                            var i = "cart-drawer,cart-icon-bubble";
                            if ("function" == typeof e.getSectionsToRender) {
                                var a = [];
                                i = e.getSectionsToRender();
                                for (var l in i) i.hasOwnProperty(l) && ("string" == typeof i[l].section ? a.push(i[l].section) : "string" == typeof i[l].id && a.push(i[l].id));
                                a.length > 0 && (i = a.join(","))
                            }
                            fetch(m.nav.getRootUrl() + "cart?sections=" + i, {
                                method: "GET",
                                cache: "no-cache",
                                credentials: "same-origin",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then((function(n) {
                                try {
                                    return n.clone().json().then((function(n) {
                                        try {
                                            var t = {
                                                sections: n
                                            };
                                            e.renderContents(t)
                                        } catch (n) {}
                                    }))
                                } catch (n) {}
                            }))
                        }
                    } catch (n) {
                        console.error(n)
                    }
                    try {
                        var r = document.querySelector("loess-cart-items") || document.querySelector("loess-cart-drawer-items");
                        if (null !== r && "function" == typeof r.renderCartItems) {
                            i = "cart-drawer,cart-icon-bubble";
                            if ("function" == typeof r.getSectionsToRender) {
                                a = [], i = r.getSectionsToRender();
                                for (var l in i) i.hasOwnProperty(l) && ("string" == typeof i[l].section ? a.push(i[l].section) : "string" == typeof i[l].id && a.push(i[l].id));
                                a.length > 0 && (i = a.join(","))
                            }
                            fetch(m.nav.getRootUrl() + "cart?sections=" + i, {
                                method: "GET",
                                cache: "no-cache",
                                credentials: "same-origin",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then((function(n) {
                                try {
                                    return n.clone().json().then((function(n) {
                                        m.cart.get(!0).then((function(t) {
                                            t.clone().json().then((function(t) {
                                                t.sections = n, r.renderCartItems(t)
                                            }))
                                        }))
                                    }))
                                } catch (n) {
                                    console.error(n)
                                }
                            }))
                        }
                    } catch (n) {
                        console.error(n)
                    }
                    try {
                        var o = document.querySelector(".minicart__outerbox");
                        if (null !== o && "function" == typeof window.cartContentUpdate) {
                            i = o.dataset.section;
                            fetch(m.nav.getRootUrl() + "cart?sections=" + i, {
                                method: "GET",
                                cache: "no-cache",
                                credentials: "same-origin",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then((function(n) {
                                try {
                                    return n.clone().json().then((function(n) {
                                        m.cart.get(!0).then((function(t) {
                                            t.clone().json().then((function(t) {
                                                t.sections = n, window.cartContentUpdate(t, o, i)
                                            }))
                                        }))
                                    }))
                                } catch (n) {
                                    console.error(n)
                                }
                            }))
                        }
                    } catch (n) {
                        console.error(n)
                    }
                    try {
                        setTimeout((() => {
                            document.dispatchEvent(new CustomEvent("dispatch:cart-drawer:refresh"))
                        }), 500)
                    } catch (n) {}
                    try {
                        "function" === window.$ && window.$("form.cart-drawer").length > 0 && (window.$(".cart-drawer input").first().trigger("blur"), setTimeout((function() {
                            window.$(".cart-drawer input").first().trigger("input")
                        }), 350))
                    } catch (n) {
                        console.log(n)
                    }
                    try {
                        window.dispatchEvent(new Event("update_cart"))
                    } catch (n) {}
                    try {
                        document.dispatchEvent(new Event("theme:cartchanged"))
                    } catch (n) {}
                    try {
                        void 0 !== window.theme && void 0 !== window.theme.cart && "function" == typeof window.theme.cart._updateCart && window.theme.cart._updateCart()
                    } catch (n) {}
                    try {
                        void 0 !== window.AMG && void 0 !== window.AMG.sidecart && "function" == typeof window.AMG.sidecart.refresh && window.AMG.sidecart.refresh()
                    } catch (n) {}
                    if (void 0 !== window.ajaxCart && "function" == typeof window.ajaxCart.load) try {
                        ajaxCart.load()
                    } catch (n) {}
                    if (void 0 !== window.Shopify && "function" == typeof window.Shopify.onItemAdded) try {
                        window.Shopify.onItemAdded()
                    } catch (n) {}
                    if (void 0 !== window.Rebuy && void 0 !== window.Rebuy.Cart && "function" == typeof window.Rebuy.Cart.fetchShopifyCart) try {
                        Rebuy.Cart.fetchShopifyCart((function(n) {}))
                    } catch (n) {}
                    try {
                        void 0 !== window.theme && void 0 !== window.theme.partials && void 0 !== window.theme.partials.Cart && "function" == typeof window.theme.partials.Cart.updateAllHtml && window.theme.partials.Cart.updateAllHtml((function() {}))
                    } catch (n) {}
                    try {
                        void 0 !== window.refreshCart && window.refreshCart()
                    } catch (n) {}
                    try {
                        void 0 !== window.upcartRefreshCart && window.upcartRefreshCart()
                    } catch (n) {}
                    try {
                        void 0 !== window.theme && void 0 !== window.theme.updateCartSummaries && window.theme.updateCartSummaries()
                    } catch (n) {}
                    try {
                        void 0 !== window.liquidAjaxCart && "function" == typeof window.liquidAjaxCart.cartRequestUpdate && window.liquidAjaxCart.cartRequestUpdate()
                    } catch (n) {}
                    try {
                        var _ = document.querySelector("cart-root");
                        null != _ && "function" == typeof _.updateHtml && _.updateHtml()
                    } catch (n) {
                        console.log(n)
                    }
                    try {
                        var d = document.querySelector("cart-drawer-items");
                        null != d && "function" == typeof d.onCartUpdate && d.onCartUpdate()
                    } catch (n) {
                        console.log(n)
                    }
                    try {
                        var s = document.querySelector("cart-drawer");
                        null != s && "function" == typeof s.update && s.update()
                    } catch (n) {
                        console.log(n)
                    }
                    try {
                        void 0 !== window.theme && "function" == typeof window.theme.CartDrawer && new theme.CartDrawer
                    } catch (n) {}
                    try {
                        fetch(`/?sections=${["cart-items","cart-footer","cart-item-count"].join(",")}`, {
                            method: "GET",
                            headers: {
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        }).then((n => n.json())).then((n => {
                            document.body.dispatchEvent(new CustomEvent("shapes:modalcart:afteradditem", {
                                bubbles: !0,
                                detail: {
                                    response: {
                                        sections: n
                                    }
                                }
                            }))
                        })).catch((n => console.error("Cart drawer update failed:", n)))
                    } catch (n) {}
                    try {
                        var u = document.querySelectorAll("#MinimogCartDrawer");
                        void 0 !== u[0] && "function" == typeof u[0].onCartDrawerUpdate && u[0].onCartDrawerUpdate()
                    } catch (n) {
                        console.log(n)
                    }
                }

                function A(n, t = new FormData, e = "") {
                    for (let a in n)
                        if (n.hasOwnProperty(a)) {
                            const l = n[a],
                                r = e ? `${e}[${a}]` : a;
                            if ("object" != typeof l || Array.isArray(l))
                                if (Array.isArray(l))
                                    for (var i = 0; i < l.length; i++) A(l[i], t, `${r}[${i}]`);
                                else t.append(r, l);
                            else A(l, t, r)
                        } return t
                }

                function C(n) {
                    let t = "";
                    for (let [e, i] of n.entries()) t.length > 0 && (t += "&"), t += `${encodeURIComponent(e)}=${encodeURIComponent(i)}`;
                    return t
                }

                function b(n) {
                    const t = new FormData;
                    if ("string" != typeof n || !n.trim()) return t;
                    const e = n.split("&");
                    for (const n of e) {
                        const [e, i] = n.split("=");
                        t.append(decodeURIComponent(e), void 0 !== i ? decodeURIComponent(i) : "")
                    }
                    return t
                }

                function S(n, t) {
                    for (var e = {
                            items: []
                        }, i = 0; i < n.length; i++) {
                        var a = {
                            id: n[i].id,
                            quantity: n[i].quantity,
                            properties: {
                                _added_by_cartbot: ""
                            }
                        };
                        void 0 !== n[i].selling_plan && "" !== n[i].selling_plan && (a.selling_plan = n[i].selling_plan), void 0 !== t && (a.properties = t);
                        for (var l = !1, r = 0; r < e.items.length; r++) e.items[r].id !== a.id || typeof a.selling_plan != typeof e.items[r].selling_plan || void 0 !== a.selling_plan && a.selling_plan !== e.items[r].selling_plan || (e.items[r].quantity += a.quantity, l = !0);
                        !1 === l && e.items.push(a)
                    }
                    void 0 !== e.items && 1 === e.items.length && (e = e.items[0]);
                    return e
                }
                changesWereMadeToTheCart = !1;
                var I = !1,
                    T = function() {};
                async function k(t, e, a, l, r) {
                    void 0 === e && (e = !0), void 0 === r && (r = !0);
                    var o = S(t, a);
                    if (!0 === I) return console.log("Already adding to the cart"), null;
                    if (I = !0, !1 === n.hasSpace()) return console.log("leaky bucket is full"), null;
                    n.add();
                    var _ = "/";
                    void 0 !== window.Shopify && void 0 !== window.Shopify.routes && "string" == typeof window.Shopify.routes.root && (_ = window.Shopify.routes.root);
                    var d = !1;
                    for (let n = 0; n < t.length; n++)
                        for (let e = 0; e < i.length; e++) i[e].id === t[n].rule_id && "true" === i[e].ask_for_confirmation && (d = !0);
                    if (!0 !== (d = await w(t, l, !1, d))) return D(_, "", "", e, o, r);
                    try {
                        return openConfirmationModal(t, (function() {
                            return D(_, "", "", e, o, r)
                        }))
                    } catch (n) {
                        console.log(n)
                    }
                }
                async function D(n, t, e, i, a, l) {
                    return void 0 === l && (l = !0), await fetch(n + "cart/add" + t + "?cartbot-cart-call&" + e, {
                        method: "POST",
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        redirect: "follow",
                        referrerPolicy: "no-referrer",
                        body: JSON.stringify(a)
                    }).then((function(n) {
                        if (I = !1, i && (void 0 === n.status || 200 !== n.status)) throw new Error("Cartbot: Couldnt add the product to the cart automatically. Please recreate your bot or check that the product you are trying to add exists and has the correct selling plan selected (if needed). " + n.status);
                        if ("function" == typeof window.$) try {
                            window.$("body").trigger("added.ajaxProduct")
                        } catch (n) {}
                        try {
                            document.documentElement.dispatchEvent(new CustomEvent("cart:refresh", {
                                detail: {
                                    open: !0
                                }
                            })), setTimeout((function() {
                                document.documentElement.dispatchEvent(new CustomEvent("cart:refresh", {
                                    detail: {
                                        open: !0
                                    }
                                }))
                            }), 1e3)
                        } catch (n) {}
                        if (!0 === l) try {
                            O()
                        } catch (n) {
                            console.error(n)
                        }
                        "function" == typeof T && T()
                    })).catch((function(n) {
                        I = !1, console.log("error", n);
                        try {
                            O()
                        } catch (n) {
                            console.error(n)
                        }
                        return "function" == typeof T && T(), null
                    }))
                }
                async function E(n) {
                    for (var t = {}, e = 0; e < n.length; e++) {
                        var i = n[e],
                            a = i.line_key;
                        void 0 === t[a] ? t[a] = {
                            id: i.id,
                            line_key: i.line_key,
                            removable_quantity: 1 * i.quantity
                        } : t[a].removable_quantity += i.quantity
                    }
                    return m.cart.get(!1).then((function(n) {
                        return n.clone().json().then((function(n) {
                            var e = {};
                            for (var i in t)
                                if (t.hasOwnProperty(i)) {
                                    for (var a = !1, l = 0; l < n.items.length; l++) {
                                        if (n.items[l].key === i && n.items[l].quantity > 0)(_ = n.items[l].quantity - t[i].removable_quantity) < 0 && (_ = 0), n.items[l].quantity = _, e[i] = _, a = !0
                                    }
                                    if (!1 === a)
                                        for (l = 0; l < n.items.length; l++) {
                                            if (0 === n.items[l].key.indexOf(i) && n.items[l].quantity > 0)(_ = n.items[l].quantity - t[i].removable_quantity) < 0 && (_ = 0), e[i] = _, a = !0
                                        }
                                    if (!1 === a) {
                                        var r = i.split(":"),
                                            o = "";
                                        void 0 !== r[0] && (o = r[0]);
                                        for (l = 0; l < n.items.length; l++) {
                                            var _;
                                            if (0 === n.items[l].key.indexOf(o) && n.items[l].quantity > 0)(_ = n.items[l].quantity - t[i].removable_quantity) < 0 && (_ = 0), e[i] = _, a = !0
                                        }
                                    }
                                } return Object.keys(e).length > 0 ? fetch("/cart/update.js?cartbot-cart-call", {
                                method: "POST",
                                cache: "no-cache",
                                credentials: "same-origin",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                redirect: "follow",
                                referrerPolicy: "no-referrer",
                                body: JSON.stringify({
                                    updates: e
                                })
                            }).then((function(n) {
                                if ("function" == typeof window.$) try {
                                    window.$("body").trigger("added.ajaxProduct")
                                } catch (n) {
                                    console.error(n)
                                }
                                try {
                                    document.documentElement.dispatchEvent(new CustomEvent("cart:refresh", {
                                        detail: {
                                            open: !0
                                        }
                                    })), setTimeout((function() {
                                        document.documentElement.dispatchEvent(new CustomEvent("cart:refresh", {
                                            detail: {
                                                open: !0
                                            }
                                        }))
                                    }), 1e3)
                                } catch (n) {}
                                try {
                                    O()
                                } catch (n) {
                                    console.error(n)
                                }
                            })) : new Promise(((n, t) => {
                                n(new Response({}, {
                                    status: 200,
                                    statusText: "Smashing success!"
                                }))
                            }))
                        }))
                    }))
                }
                return {
                    init: function() {
                        if (void 0 !== window.completelyDisableCartbotApp && !0 === window.completelyDisableCartbotApp) return console.log("Cartbot is disabled via completelyDisableCartbotApp variable."), !0;
                        window.OpusNoATC = !0,
                            function() {
                                n = XMLHttpRequest.prototype.send, XMLHttpRequest.prototype.send = function(t) {
                                    var e = this._url,
                                        a = !1;
                                    if ("string" == typeof e && e.length > 0) {
                                        var l = m.string.getRandomString(10);
                                        try {
                                            var d = this.onreadystatechange;
                                            if (this.onreadystatechange = function() {
                                                    "function" == typeof d && d.apply(this, arguments), 200 === this.status && 4 === this.readyState && m.promiseQueue.process(l)
                                                }, p(e, "change")) {
                                                var c = s([e, arguments[0]], !0);
                                                if ((h = q(c, !1, "change")).remove.length > 0) {
                                                    var g = arguments,
                                                        y = this;
                                                    a = !0, h.add.length > 0 ? k(h.add, !1, void 0, c).then((function(t) {
                                                        h.remove.length > 0 && h.remove[0].id == c.id && h.remove[0].quantity === 1 * c.quantity ? E(h.remove).then((function(n) {
                                                            m.nav.isCartPage() && m.nav.reload()
                                                        })) : E(h.remove).then((function(t) {
                                                            n.apply(y, g)
                                                        }))
                                                    })) : (a = !1, m.promiseQueue.add(l, (function() {
                                                        return E(h.remove)
                                                    }), (function() {})))
                                                } else m.promiseQueue.add(l, (function() {
                                                    return r(!1, "change")
                                                }), (function() {}))
                                            } else {
                                                var h;
                                                if (!1 !== (c = s([e, arguments[0]])))
                                                    if (!0, m.promiseQueue.add(l, (function() {
                                                            return o()
                                                        }), (function() {})), (h = v(c, !1, "add")).add.length > 0) {
                                                        g = arguments, y = this;
                                                        var O = Array.from(arguments);
                                                        a = !0;
                                                        var arguments, b = !1;
                                                        if (h.remove.length > 0 && h.remove[0].id == c.id && h.remove[0].quantity === 1 * c.quantity && "string" == typeof(arguments = g)[0]) {
                                                            var I = S(h.add); - 1 !== e.indexOf("bundler-cart-call") && c.other_items.length > 1 && (I = f(I, c.other_items, c.id));
                                                            var T = A(I);
                                                            arguments[0] = C(T), b = !0;
                                                            var D = arguments,
                                                                N = !1;
                                                            if (void 0 !== h.add[0] && void 0 !== h.add[0].rule_id)
                                                                for (let n = 0; n < i.length; n++) i[n].id === h.add[0].rule_id && "true" === i[n].ask_for_confirmation && (N = !0);
                                                            w(h.add, c, !0, N).then((t => {
                                                                !0 === (N = t) ? openConfirmationModal(h.add, (() => new Promise(((n, t) => {
                                                                    n()
                                                                })).then((() => {
                                                                    n.apply(y, D)
                                                                }))), !1, (() => {
                                                                    n.apply(y, O)
                                                                })) : n.apply(y, D)
                                                            }))
                                                        }!1 === b && k(h.add, !1, void 0, c).then((n => new Promise((t => setTimeout((() => t(n)), 750))))).then((function(t) {
                                                            n.apply(y, g), h.remove.length > 0 && m.promiseQueue.add(l, (function() {
                                                                return E(h.remove)
                                                            }), (function() {}))
                                                        }))
                                                    } else h.remove.length > 0 ? (g = arguments, y = this, E(h.remove).then((function(n) {
                                                        m.promiseQueue.process(l)
                                                    }))) : (m.promiseQueue.add(l, (function() {
                                                        var n = 0;
                                                        return new Promise((t => setTimeout((() => {
                                                            console.log("resolving promise"), t(_)
                                                        }), n))).then((function() {
                                                            return r(!1, "add")
                                                        }))
                                                    }), (function() {})), setTimeout((function() {
                                                        m.promiseQueue.process(l)
                                                    }), 500))
                                            }
                                        } catch (n) {
                                            console.log("Cartbot"), console.error(n)
                                        }
                                        u([this._url]) && (!0, m.promiseQueue.add(l, (function() {
                                            return o()
                                        }), (function() {})))
                                    }!0 !== a && n.apply(this, arguments)
                                };
                                var n;
                                ! function(n) {
                                    var t = ["fetch", "xbcFetch"];
                                    for (let a = 0; a < t.length; a++) {
                                        let l = t[a];
                                        if ("function" == typeof n[l]) try {
                                            var e = n[l];
                                            n[l] = function() {
                                                var n = m.string.getRandomString(10);
                                                p(arguments[0], "clear") && m.cart.clearCartData();
                                                try {
                                                    if (p(arguments[0], "change")) {
                                                        if (!1 !== (y = s(arguments, !0)))
                                                            if (m.promiseQueue.add(n, (function() {
                                                                    return r(!1, "change")
                                                                }), (function() {})), (c = q(y, !1, "change")).add.length > 0) {
                                                                if (1 === c.add.length) {
                                                                    if (1 * c.add[0].id !== y.id) {
                                                                        var t = arguments,
                                                                            a = this;
                                                                        return !0, (B = e.apply(a, t)).then((function(t) {
                                                                            k(c.add, !1, void 0, y).then((function(t) {
                                                                                m.promiseQueue.process(n), m.nav.isCartPage() && m.nav.reload()
                                                                            }))
                                                                        })), B
                                                                    }
                                                                    var l = y.number_of_line_in_cart - 1,
                                                                        _ = !1;
                                                                    void 0 !== m.cart.cartData.items[l].properties._added_by_cartbot && (_ = !0);
                                                                    var d = void 0 !== m.cart.cartData.items[l].properties._cartbot;
                                                                    if (!0 === _ || !0 === d) return new Promise(((n, t) => {
                                                                        cancelled = !0, console.log("This item is required and can't be removed from the cart."), t(new Error("Can't remove this item from the cart."))
                                                                    }))
                                                                }
                                                            } else if (c.remove.length > 0) {
                                                            t = arguments, a = this;
                                                            return (B = e.apply(a, t)).then((function(t) {
                                                                E(c.remove).then((function(t) {
                                                                    m.promiseQueue.process(n), m.nav.isCartPage() && m.nav.reload()
                                                                }))
                                                            })), B
                                                        }
                                                    } else {
                                                        var c, y = s(arguments);
                                                        if (!1 !== y)
                                                            if (!0, m.promiseQueue.add(n, (function() {
                                                                    return o()
                                                                }), (function() {})), (c = v(y, !1, "add")).add.length > 0) {
                                                                var h = arguments;
                                                                t = arguments, a = this;
                                                                !0, m.promiseQueue.add(n, (function() {
                                                                    return r(!1, "add")
                                                                }), (function() {}));
                                                                var arguments, f = !1;
                                                                if (c.remove.length > 0 && c.remove[0].id == y.id)
                                                                    if (void 0 !== (arguments = t)[1] && void 0 !== arguments[1].body) {
                                                                        for (var O = C(arguments[1].body), I = S(c.add), T = A(I), D = ["sections", "sections_url"], N = 0; N < D.length; N++) try {
                                                                            if ("string" == typeof arguments[1].body) {
                                                                                var R = m.nav.getQueryParams(arguments[1].body);
                                                                                if (void 0 !== R[D[N]]) var P = R[D[N]];
                                                                                else P = null
                                                                            } else P = arguments[1].body.get(D[N]);
                                                                            null != P && T.append(D[N], P)
                                                                        } catch (n) {
                                                                            console.log(n)
                                                                        }
                                                                        "string" == typeof arguments[1].body ? g(arguments[1].body) ? arguments[1].body = JSON.stringify(I) : arguments[1].body = C(T) : arguments[1].body = T, f = !0;
                                                                        var L = !1;
                                                                        if (void 0 !== c.add[0] && void 0 !== c.add[0].rule_id)
                                                                            for (let n = 0; n < i.length; n++) i[n].id === c.add[0].rule_id && "true" === i[n].ask_for_confirmation && (L = !0);
                                                                        var j = arguments,
                                                                            x = (n, t, e) => n.apply(t, e).then((n => n.clone().json().then((t => {
                                                                                if (void 0 !== t.sections && void 0 === t.key && void 0 !== t.sections["cart-notification-product"]) {
                                                                                    const n = /cart-notification-product-([\d]+:[a-f0-9]+)/,
                                                                                        e = t.sections["cart-notification-product"].match(n);
                                                                                    e && e[1] && (t.key = e[1])
                                                                                }
                                                                                return new Response(JSON.stringify(t), {
                                                                                    headers: {
                                                                                        "Content-Type": "application/json"
                                                                                    },
                                                                                    status: n.status,
                                                                                    statusText: n.statusText
                                                                                })
                                                                            }))));
                                                                        return w(c.add, y, !0, L).then((n => {
                                                                            if (!0 !== (L = n)) return x(e, a, j);
                                                                            try {
                                                                                return openConfirmationModal(c.add, (function() {
                                                                                    return x(e, a, j)
                                                                                }), !0, (function() {
                                                                                    return h[1].body = b(O), x(e, a, h)
                                                                                }), !0)
                                                                            } catch (n) {
                                                                                console.log(n)
                                                                            }
                                                                        }))
                                                                    } if (!1 === f) {
                                                                    var J = 10;
                                                                    return k(c.add, !1, void 0, y).then((n => new Promise((t => setTimeout((() => t(n)), J))))).then((function(i) {
                                                                        var l;
                                                                        return c.remove.length > 0 ? ((l = e.apply(a, t)).then((function(t) {
                                                                            E(c.remove).then((function(t) {
                                                                                m.promiseQueue.process(n)
                                                                            }))
                                                                        })), l) : ((l = e.apply(a, t)).then((function(t) {
                                                                            m.promiseQueue.process(n)
                                                                        })), l)
                                                                    }))
                                                                }
                                                            } else {
                                                                if (c.remove.length > 0) {
                                                                    var B;
                                                                    t = arguments, a = this;
                                                                    return (B = e.apply(a, t)).then((function(t) {
                                                                        E(c.remove).then((function(t) {
                                                                            m.promiseQueue.process(n)
                                                                        }))
                                                                    })), B
                                                                }
                                                                m.promiseQueue.add(n, (function() {
                                                                    return r(!1, "add")
                                                                }), (function() {}))
                                                            }
                                                    }
                                                } catch (n) {
                                                    console.log("Cartbot"), console.error(n)
                                                }
                                                return u(arguments) && (!0, m.promiseQueue.add(n, (function() {
                                                    return o()
                                                }), (function() {}))), (B = e.apply(this, arguments)).then((function(t) {
                                                    m.promiseQueue.process(n)
                                                })), B
                                            }
                                        } catch (n) {
                                            console.log(n)
                                        }
                                    }
                                }(window)
                            }(),
                            function() {
                                try {
                                    document.addEventListener("click", (function(n) {
                                        try {
                                            var e = !1;
                                            if (e = n.target.matches('form[action*="/cart/add"] #gokwik-buy-now') || n.target.matches('form[action*="/cart/add"] #gokwik-buy-now *'), n.target.matches('form[action*="/cart/add"] .shopify-payment-button__button') || n.target.matches('form[action*="/cart/add"] .shopify-payment-button__button *') || n.target.matches('form[action*="/cart/add"] .shopify-payment-button') || n.target.matches('form[action*="/cart/add"] .shopify-payment-button *') || n.target.matches('form[action*="/cart/add"] .shopify-payment-button__more-options') || n.target.matches('form[action*="/cart/add"] [onclick="onClickBuyBtn(this, event)"]') || n.target.matches('form[action*="/cart/add"] .lh-buy-now') || n.target.matches("form.fast-checkout-form #fast-checkout-btn") || e) {
                                                n.preventDefault(), n.stopPropagation(), n.stopImmediatePropagation();
                                                var i = t(n.target, "form");
                                                if (null !== i) {
                                                    n.preventDefault(), n.stopPropagation(), n.stopImmediatePropagation();
                                                    var a = i.getAttribute("action");
                                                    null === a && (a = "/cart/add");
                                                    var o = new URLSearchParams,
                                                        _ = new FormData(i);
                                                    for (var d of _) o.append(d[0], d[1]);
                                                    var c = s([a, {
                                                            body: o
                                                        }]),
                                                        u = q(c, !0, "add");
                                                    a += "?cartbot-cart-call";
                                                    var p = "buy_now_queue";
                                                    if (u.add.length > 0) {
                                                        addingVariants = !0, m.promiseQueue.add(p, (function() {
                                                            return k(u.add, !1, void 0, c, !1)
                                                        }), l)
                                                    } else u.remove.length > 0 && m.promiseQueue.add(p, (function() {
                                                        return E(u.remove)
                                                    }), l);
                                                    var g = !0;
                                                    if (u.remove.length > 0) try {
                                                        var y = o.get("id");
                                                        u.remove[0].id === y && (g = !1)
                                                    } catch (n) {
                                                        console.log(n)
                                                    }!0 === g && m.promiseQueue.add(p, (function() {
                                                        return fetch(a, {
                                                            method: "post",
                                                            body: o
                                                        }).then((function(n) {}))
                                                    }), l), m.promiseQueue.add(p, (function() {
                                                        return r(!0, "add")
                                                    }), l), m.promiseQueue.process(p)
                                                }
                                            }
                                        } catch (n) {
                                            console.log(n.message)
                                        }
                                    }), !0)
                                } catch (n) {
                                    console.log(n.message)
                                }! function() {
                                    var n = "input[type='submit'][name='checkout']:not(.productForm-submit), button[type='submit'][name='checkout']:not(.productForm-submit):not([disabled]), button.checkout-button[name='checkout'], form.cart-form a.btn-checkout, a[href='/checkout'], #dropdown-cart button.btn-checkout, .cart-popup-content a.btn-checkout, .cart__popup a.checkout-button, .widget_shopping_cart_content a[href='/checkout'], .jas_cart_page button.checkout-button, .mini-cart-info button.mini-cart-button, a.checkout-link, a.mini-cart-checkout-button, .shopping_cart_footer .actions button";
                                    n += ', #dropdown-cart button.btn[onclick="window.location=\'/checkout\'"], form[action="/cart"] button[name="checkout"], .bundler-checkout-button, input.action_button[type="submit"][value="Checkout"]', n += ', button.Cart__Checkout[type="submit"][name="checkout"] span', n += ', .popup-cart a[href^="/checkout"], #slidecarthq .footer button.button', n += ", button.cart__checkout-cta, button.sidecart__checkout-cta", n += ", button.bc-atc-slide-checkout-btn", n += ", #ajax-cart__content .ajax-cart__button.button--add-to-cart", n += ", .cart_container form.js-cart_content__form button.add_to_cart.action_button", n += ', .cart_container .js-cart_content__form input.action_button[type="submit"]', n += ", #checkout_shipping_continue_btn", n += ', .spurit-occ2-checkout a[name="checkout"][href="/checkout/"]', n += ", #checkout-button", n += ", button.btn-checkout", n += ", button.rebuy-cart__checkout-button", n += ', .go-cart__button[href*="/checkout/"],  .go-cart__button[href*="/checkout?"]', n += ', a[href*="/checkout/"]:not([href*="/a/bundles/checkout/"]):not([href*="/subscriptions/"]), a[href*="/checkout?"]:not([href*="partial.ly"])', n += ", input.cart--button-checkout, a.satcb-cs-checkout-btn", n += ", button#parcelySubmit[data-cart-submit]", n += ', #checkout[type="submit"][name="checkout"], #checkout[type="submit"][name="checkout"] .custom-cobutton', n += ', a[href*="/checkout"]:not([href*="/a/bundles/checkout/"]):not([href*="/subscriptions/"]):not([href*="partial.ly"]):not([href^="https://checkout"])', n += ", .rebuy-cart__flyout-footer .rebuy-cart__flyout-subtotal + .rebuy-cart__flyout-actions > button.rebuy-button:first-child, .rebuy-cart__flyout-footer .rebuy-cart__flyout-subtotal + .rebuy-cart__flyout-actions > button.rebuy-button:first-child span", n += ", .rebuy-cart__checkout-button, .rebuy-cart__checkout-button span, rebuy-cart__checkout-button span i", n += ", .quick-cart__buy-now[data-buy-now-button], .icart-checkout-btn, .icartCheckoutBtn", n += ', button.cart__checkout, button[type="submit"][form="mini-cart-form"]', n += ', button[type="submit"][form="mini-cart-form"] span, button[type="submit"][form="mini-cart-form"] span svg', n += ', .SideCart__footer button[type="submit"]', n += ', div[onclick="clicktocheckoutnormal()"], div[onclick="clicktocheckout()"]', n += ", .mini-cart__actions .mini-cart__checkout, .mini-cart__actions .mini-cart__checkout *", n += ", button.checkout-button[onclick=\"window.location='/checkout'\"]", n += ', [data-ocu-checkout="true"]', n += ', input[type="submit"][name="checkout"].cart__submit', n += ', [data-ocu-checkout="true"], .btncheckout', n += ', form[action="/cart"][method="post"] button[type="submit"]:not([name*="update"]):not([name*="add"])', n += ", a.js-checkout, #mu-checkout-button", n += ', #cart-sidebar-checkout:not([disabled="disabled"]), .checkout-x-buy-now-btn, .checkout-x-buy-now-btn .hs-add--to--cart, .slider-cart-checkout-btn', n += ", button[onclick=\"window.location='/checkout'\"], .ymq-fake-checkout-btn, button.StickyCheckout__button", n += ', input[type="submit"][name="checkout"], a.checkout-button', n += ", .hs-content-checkout-button, .hs-content-checkout-button .hs-add--to--cart, .hs-content-checkout-button .hs-checkout-purchase", n += ", button.cart__checkout-button, button.cart__checkout-button .loader-button__text, button.cart__checkout-button .loader-button__loader, button.cart__checkout-button .loader-button__loader div, button.cart__checkout-button .loader-button__loader div svg", n += ", .cd-cart-checkout-button", n += ", .sezzle-checkout-button, .sezzle-checkout-button .sezzle-button-logo-img", n += ", .Cart__Footer .Cart__Checkout, .cart--checkout-button button, .cart--checkout-button button span, button.js-process-checkout", n += ', .j2t-checkout-link, .j2t-checkout-link span, #cart-checkout, #cart-notification-form button[name="checkout"]', n += ", .zecpe-btn-checkout, .zecpe-btn-checkout span, .mbcOverlayOnCheckout, #checkoutCustom, #wsg-checkout-one", n += ", .icart-chk-btn, .side-cart__checkout button#sideCartButton", n += ', .cart__checkout-button, #actionsArea button[onclick="startCheckoutEvent()"], button.cart--button-checkout, .kaktusc-cart__checkout, .cart__checkout', n += ', #cartform_bottom #actionsArea button, hh-button[href="/checkout"]', n += ", .cart-drawer--checkout-button button, .scd__checkout, button.scd__checkout span, #cart-summary button[data-cart-submit]", n += ", .cart__footer .cart__submit-controls input.cart__submit, #CartDrawer-Checkout, .ajax-cart__button-submit, .amp-cart__footer-checkout-button, button#checkout, button#checkout span";
                                    try {
                                        document.addEventListener("click", (function(t) {
                                            try {
                                                if (!0 === canPreventCheckout && t.target.matches(n)) {
                                                    if (void 0 !== window.ZapietCheckoutEnabled && !1 === window.ZapietCheckoutEnabled) return !0;
                                                    t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), !0 !== t.target.matches("[wallet-params]") && t.target.classList.add("cartbot-checkout-button-clicked"), a(t.target)
                                                }
                                            } catch (n) {
                                                console.log(n.message), l()
                                            }
                                        }), !0)
                                    } catch (n) {}
                                }();
                                try {
                                    addEventListener("storage", (function(n) {
                                        "string" == typeof n.key && "cartbot_data_cart" === n.key && m.cart.get(!1, !1)
                                    }))
                                } catch (n) {
                                    console.log(n.message)
                                }
                            }(), setTimeout((function() {
                                r(!1, "")
                            }), 1e3), window.addEventListener("icartAddToCartEvent", (function() {
                                console.log("Item added to the cart"), r(!1, "add")
                            })), window.addEventListener("icartUpdateCartEvent", (function() {
                                console.log("iCart updated"), r(!1, "")
                            })), window.addEventListener("OpusCartChange", (function() {
                                r(!1, "")
                            }));
                        class n extends HTMLElement {
                            constructor() {
                                super(), this.attachShadow({
                                    mode: "open"
                                })
                            }
                            connectedCallback() {
                                this.injectStyles(), this.fetchProductData()
                            }
                            injectStyles() {
                                const n = document.createElement("style");
                                var t = getConfirmationModalProductStyles();
                                n.textContent = t, this.shadowRoot.appendChild(n)
                            }
                            async fetchProductData() {
                                const n = this.getAttribute("data-handle");
                                if (n) try {
                                    const t = await fetch(`/products/${n}.js?`);
                                    if (!t.ok) throw new Error("Network response was not ok");
                                    let e = await t.json();
                                    e = this.remapProductData(e), this.renderProduct(e)
                                } catch (n) {
                                    console.error("Error fetching product data:", n)
                                } else console.error("Missing data-handle attribute")
                            }
                            remapProductData(n) {
                                return {
                                    product: {
                                        title: n.title,
                                        handle: n.handle,
                                        image: {
                                            src: "https:" + n.featured_image
                                        },
                                        variants: n.variants.map((n => ({
                                            id: n.id,
                                            title: n.title,
                                            price: (n.price / 100).toFixed(2),
                                            featured_image: n.featured_image
                                        })))
                                    }
                                }
                            }
                            renderProduct(n) {
                                if (!n) return;
                                n = n.product;
                                let t = 1 * this.getAttribute("data-variant-id");
                                if (!t) return void console.error("Missing data-variant-id attribute");
                                let e = this.getAttribute("data-quantity");
                                if (!e) return void console.error("Missing data-quantity attribute");
                                let i = "",
                                    a = {},
                                    l = n.title;
                                for (let e = 0; e < n.variants.length; e++) n.variants[e].id === t && (a = n.variants[e], "Default Title" !== a.title && (l += " - " + a.title));
                                void 0 !== a.price && (i = 100 * a.price);
                                var r = m.money.formatPrice(i),
                                    o = "//cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081";
                                "string" == typeof n.image && (o = n.image), void 0 !== n.image && "string" == typeof n.image.src && (o = n.image.src), null !== a.featured_image && void 0 !== a.featured_image && "string" == typeof a.featured_image.src && a.featured_image.src.length > 0 && (o = a.featured_image.src);
                                const _ = document.createElement("template");
                                _.innerHTML = `\n\t\t\t\t\t\t\t\t<div class="cartbot-confirmation-product" part="product">\n\t\t\t\t\t\t\t\t\t<div class="cartbot-confirmation-product-info">\n\t\t\t\t\t\t\t\t\t\t<a href="${window.location.origin}/products/${n.handle}" target="_blank">\n\t\t\t\t\t\t\t\t\t\t\t<img src="${o}" \n\t\t\t\t\t\t\t\t\t\t\t\t alt="Product Image" \n\t\t\t\t\t\t\t\t\t\t\t\t part="product-image"\n\t\t\t\t\t\t\t\t\t\t\t\t style="max-width: 100%;">\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<a href="${window.location.origin}/products/${n.handle}" target="_blank" style="text-decoration: none;">\n\t\t\t\t\t\t\t\t\t\t\t<p class="cartbot-confirmation-product-title" part="product-title">${e}x ${l}</p>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<span class="cartbot-confirmation-product-price" part="product-price" id="cartbot-confirmation-price-${n.id}">\n\t\t\t\t\t\t\t\t\t\t\t${r}\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t`, this.shadowRoot.appendChild(_.content.cloneNode(!0))
                            }
                        }
                        customElements.define("cartbot-product", n)
                    },
                    applyBots: function() {
                        return !1 === e && (e = !0, a(), !0)
                    },
                    refresh: function() {
                        c("cartbot_refresh", (function() {
                            try {
                                r()
                            } catch (n) {
                                console.log(n)
                            }
                        }), 100)
                    },
                    addingToCart: I
                }
            }();
            if (void 0 === v) var v = {};
            async function w(n, t, e, i) {
                return !1 !== i
            }
            f.init(), window.cartbot = {
                outputProductUrls: function() {
                    for (var n = [], t = 0; t < i.length; t++)
                        for (var e in i[t].product_variants_contain) i[t].product_variants_contain.hasOwnProperty(e) && n.push(m.nav.getRootUrl() + "variants/" + encodeURIComponent(i[t].product_variants_contain[e].variant_id));
                    console.log(JSON.parse(JSON.stringify(n)))
                },
                outputProductUrlsGrouped: function(n, t) {
                    for (var e = {}, a = 0; a < i.length; a++) {
                        var l = i[a].name;
                        for (var r in e[l] = [], i[a].product_variants_contain) i[a].product_variants_contain.hasOwnProperty(r) && e[l].push(m.nav.getRootUrl() + "variants/" + encodeURIComponent(i[a].product_variants_contain[r].variant_id))
                    }
                    console.log(JSON.parse(JSON.stringify(e)))
                },
                applyBots: f.applyBots,
                refresh: f.refresh
            }, Object.defineProperty(window.cartbot, "isCartbotAddingToCart", {
                get: function() {
                    return !0 === f.addingToCart
                },
                configurable: !1
            })
        }()
    }()
}