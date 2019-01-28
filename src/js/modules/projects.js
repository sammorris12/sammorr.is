let height, scrollTop, projects;

export default {
    init: function () {
        this.updateFixedValues();
        this.updateDynamicValues();
        this.checkForActiveProject();
        this.bindings();
    },

    bindings: function() {
        $(window).scroll(function(e) {
            this.updateDynamicValues();
            this.checkForActiveProject();
        }.bind(this));

        $(window).resize(function() {
            this.updateFixedValues();
            this.updateDynamicValues();
            this.checkForActiveProject();
        }.bind(this));
    },

    updateDynamicValues: function() {
        scrollTop = $(window).scrollTop();
    },

    updateFixedValues: function() {
        height = $(window).height();

        projects = [];

        $('.project').each(function() {
            projects.push($(this).offset().top)
        });
    },

    checkForActiveProject: function() {
        let activeProject;

        projects.forEach(function(top, i) {
            if (scrollTop + (height / 2) > top) {
                activeProject = i;
            }
        });

        if (typeof activeProject === 'number') {
            activeProject = $('.project').get(activeProject);

            if (!$(activeProject).hasClass('project--active')) {
                this.resetActiveProject();

                $(activeProject).addClass('project--active');
                $('.project--active .project__video').get(0).play();
            }
        } else {
            this.resetActiveProject();
        }
    },

    resetActiveProject: function() {
        if ($('.project--active').length) {
            $('.project--active .project__video').get(0).pause();
            $('.project--active .project__video').get(0).currentTime = 0;
            $('.project--active').removeClass('project--active');
        }
    }
}
